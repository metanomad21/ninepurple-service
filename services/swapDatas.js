const ethers = require('ethers');
const swapUtils = require('../utils/swap-utils');
const commonUtils = require('../utils/common');
const {httpCfg, dbCfg, providerURLCfg, adminKey, swapAddrCfg} = require('../conf/swapDatasCfg');
// const withdrawData = require('../request/graph/obridge/withdrawData');

const fs = require('fs');
const path = require('path');
const log4js = require("log4js");
const db = require("../utils/db-utils");
db.init(dbCfg.host, dbCfg.user, dbCfg.password, dbCfg.database);
const express = require('express');
const { lookup } = require('dns');
var app = express();
var httpServer = app.listen(httpCfg.port, function () {
    var host = httpServer.address().address;
    var port = httpServer.address().port;
    logger.info('Http app listening at ', host, port);
});
const DENOMINATOR_MAX = ethers.utils.parseEther("1");
const NPC_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const WNPC_ADDRESS = "0xe7009A8E41E8d2101AFB6c9e40D123621c4DAfCe";

/**
 * 
 * 日志设置
 * 
 */
log4js.configure({
    appenders: {
          out: { type: "console" },
          swapDatas: {
                type: "dateFile",
                filename: "../logs/swapDatas/normal",
                pattern: "yyyy-MM-dd.log",
                alwaysIncludePattern: true,
          },
    },
    categories: { default: { appenders: ["swapDatas", "out"], level: "debug" } },
});
let logger = log4js.getLogger("[swapDatas]");


/**
 * 
 * HTTP 服务
 * 
 */

 app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


/**
 * 获取报价
 */
 app.get('/quote',async function (req, res) {
    let chainId = req.query.chainId;
    let addrIn = req.query.sellToken;
    let addrOut = req.query.buyToken;
    let amountIn = req.query.sellAmount;      //ether style   
    let slippagePercentage = req.query.slippagePercentage;   

    let returnData = {
        code:1,
        data:[],
        message:""
    };

    try{

        if(chainId == null || chainId == undefined || chainId == ""){
            chainId = 9333;
        }
        if(addrIn == null || addrIn == undefined || addrIn == ""){
            throw("invalid param addrIn");
        }
        if(addrOut == null || addrOut == undefined || addrOut == ""){
            throw("invalid param addrOut");
        }
        let provider = getProvider(chainId);
        if(provider == null){
            throw("invalid param chainId:"+chainId);
        }

        if(addrIn.toLowerCase() == NPC_ADDRESS.toLowerCase()) {
            addrIn = WNPC_ADDRESS;
        }
        if(addrOut.toLowerCase() == NPC_ADDRESS.toLowerCase()) {
            addrOut = WNPC_ADDRESS;
        }
        console.log("Addr in/out:", addrIn, addrOut);
        let wallet = new ethers.Wallet(adminKey, provider);
        console.log("Wallet Data:", wallet.address);
        let routingRes = await swapUtils.getUniRouting(db, addrIn, amountIn.toString(), addrOut, provider, wallet);
        returnData['code'] = 0;
        
        if(routingRes != null){
            let sellTokenToEthRate = 0;
            if(addrIn.toLowerCase() == WNPC_ADDRESS.toLowerCase()) {
                sellTokenToEthRate = 1;
            }else{
                let pairReserves = await swapUtils.getPairReserves(addrIn ,WNPC_ADDRESS, routingRes['tokenData'].in.decimals, 18, provider, wallet);
                if(pairReserves[1] != 0){
                    if(18 - routingRes['tokenData'].in.decimals > 0) {
                        pairReserves[0] = pairReserves[0] * (Math.pow(10,(18 - routingRes['tokenData'].in.decimals)));
                    }
                    sellTokenToEthRate = pairReserves[0]/pairReserves[1];
                }
            }
            let buyTokenToEthRate = 0;
            if(addrOut.toLowerCase() == WNPC_ADDRESS.toLowerCase()) {
                buyTokenToEthRate = 1;
            }else{
                let pairReserves = await swapUtils.getPairReserves(addrOut ,WNPC_ADDRESS, routingRes['tokenData'].out.decimals, 18, provider, wallet);
                if(pairReserves[1] != 0){
                    if(18 - routingRes['tokenData'].out.decimals > 0) {
                        console.log("Before ** :", pairReserves[0], Math.pow(10, (18 - routingRes['tokenData'].out.decimals)));
                        pairReserves[0] = pairReserves[0] * Math.pow(10, (18 - routingRes['tokenData'].out.decimals));
                        console.log("After ** :", pairReserves[0]);
                    }
                    buyTokenToEthRate = pairReserves[0]/pairReserves[1];
                }
            }
            console.log("Rate Eth: ", sellTokenToEthRate, buyTokenToEthRate);
            let pathTokenAdds = [];
            for(var t in routingRes['routing']) {
                pathTokenAdds.push(routingRes['routing'][t].address);
            }
            let estimatedGas = 400000;
            let feeIn = amountIn * 0.003;
            returnData['data'] = {
                "chainId": chainId,
                "price": routingRes['price'],
                "guaranteedPrice": routingRes['price'] * (1 - slippagePercentage),
                "priceImpact": routingRes['priceImpact'],
                "to": swapAddrCfg[chainId].address,
                "data":"",
                "value":0,
                "gas": estimatedGas,
                "estimatedGas": estimatedGas,
                "gasPrice": "1000000001",
                "protocolFee": feeIn,
                "minimumProtocolFee": feeIn,
                "buyTokenAddress":addrOut,
                "sellTokenAddress": addrIn,
                "buyAmount":routingRes['outAmount'], 
                "sellAmount": amountIn,
                "sources": [
                    {
                        "name": "9PurpleSwap",
                        "proportion": "1"
                    }
                ],
                "orders": [
                    {
                        "type": 0,
                        "source": "9PurpleSwap",
                        "makerToken": addrOut,
                        "takerToken": addrIn,
                        "makerAmount": routingRes['outAmount'],
                        "takerAmount": amountIn,
                        "fillData": {
                            "tokenAddressPath": pathTokenAdds,
                            "router": swapAddrCfg[chainId].address
                        },
                        "fill": {
                            "input": amountIn,
                            "output": routingRes['outAmount'],
                            "adjustedOutput": "1",
                            "gas": estimatedGas
                        },
                        "sourcePathId": ""
                    }
                ],
                "allowanceTarget": swapAddrCfg[chainId].address,
                "decodedUniqueId": "",
                "sellTokenToEthRate": sellTokenToEthRate,
                "buyTokenToEthRate": buyTokenToEthRate,
                "expectedSlippage": routingRes['price'] * slippagePercentage,
                "percentageFee": 0.003 
            };
        }
        return res.json(returnData);

    }catch(error){
        logger.error("getSwapRoute:", error);
        return res.status(400).send();
    }

});

function getProvider(chainId) {
    let providerURL = providerURLCfg[chainId];
    if(providerURL != null && providerURL != "" && providerURL != undefined)
        return new ethers.providers.JsonRpcProvider(providerURL);
    else
        return null;
}


main();
async function main (){
    
}   

logger.info(`start script\n`);



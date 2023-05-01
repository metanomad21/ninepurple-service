const ethers = require('ethers');
const swapUtils = require('../utils/swap-utils');
const commonUtils = require('../utils/common');
const {httpCfg, dbCfg, NPUSD_IMPL} = require('../conf/tokenDatasCfg');

const fs = require('fs');
const path = require('path');
const log4js = require("log4js");
const db = require("../utils/db-utils");
db.init(dbCfg.host, dbCfg.user, dbCfg.password, dbCfg.database, dbCfg.port);
const express = require('express');
const { lookup } = require('dns');
var app = express();
var httpServer = app.listen(httpCfg.port, function () {
    var host = httpServer.address().address;
    var port = httpServer.address().port;
    logger.info('Http app listening at ', host, port);
});
const DENOMINATOR_MAX = ethers.utils.parseEther("1");

/**
 * 
 * 日志设置
 * 
 */
log4js.configure({
    appenders: {
          out: { type: "console" },
          tokenDatas: {
                type: "dateFile",
                filename: "../logs/tokenDatas/normal",
                pattern: "yyyy-MM-dd.log",
                alwaysIncludePattern: true,
          },
    },
    categories: { default: { appenders: ["tokenDatas", "out"], level: "debug" } },
});
let logger = log4js.getLogger("[tokenDatas]");


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
    res.header("Content-Type", "application/json;charset=utf-6");
    next();
});

//npusd后台mint/burn
app.post('/mintburn',async function (req, res) {
    
    let returnData = {
        code:1,
        data:[],
        message:""
    };
    try{
        let amount = req.query.amount;
        if(!amount) {
            throw("invalid param amount");
        }
        let receiver = req.query.receiver;
        if(!receiver) {
            throw("invalid param receiver");
        }
        let tokenAddr = req.query.tokenAddr;
        if(!tokenAddr) {
            throw("invalid param tokenAddr");
        }

        //todo 为这个订单加redis锁
        
        const providerNpchain = new ethers.providers.JsonRpcProvider(providerCfg['9PURPLE']);
        let walletIssuer = new ethers.Wallet(issuerPK, providerNpchain);
        let implAbi = commonUtils.getAbi("ERC20Impl");
        let implObj = new ethers.Contract(tokenAddr, implAbi, walletIssuer);
    
        //校验权限token
    
        let printAmount = amount;
        let printReqRes = await implObj.requestPrint(receiver, printAmount);
        // console.log("Print req :", printReqRes.hash);
        await printReqRes.wait();
    
        let reqLength = await implObj.getRequestPrintRecordLength(admin.address);
        let lockIdRes = await implObj.requestPrintRecord(admin.address, reqLength - 1);
        console.log("Lock id:", lockIdRes);
    
        let printConfirmRes = await implObj.confirmPrint(lockIdRes);
        await printConfirmRes.wait();
        console.log("PrintConfirm Res:", printConfirmRes.hash);
        
        returnData['code'] = 0;
        returnData['data']['tx'] = printConfirmRes.hash;
        return res.json(returnTokens);

    }catch(err) {
        logger.error("mintburn:", error);
        return res.status(400).send();
    }
});




main();
async function main (){
    
}   

logger.info(`start script\n`);



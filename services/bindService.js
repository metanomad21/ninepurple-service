const ethers = require('ethers');
const {httpCfg, dbCfg} = require('../conf/bindServiceCfg');

const fs = require('fs');
const path = require('path');
const log4js = require("log4js");
const db = require("../utils/db-utils");
db.init(dbCfg.host, dbCfg.user, dbCfg.password, dbCfg.database, dbCfg.port);
const express = require('express');
const { lookup } = require('dns');
var app = express();
app.use(express.json());
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
          bindService: {
                type: "dateFile",
                filename: "../logs/bindService/normal",
                pattern: "yyyy-MM-dd.log",
                alwaysIncludePattern: true,
          },
    },
    categories: { default: { appenders: ["bindService", "out"], level: "debug" } },
});
let logger = log4js.getLogger("[bindService]");


/**
 * 
 * HTTP 服务
 * 
 */

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-6");
    next();
});


/**
 * 获取商家信息
 */
 app.get('/getMerchants',async function (req, res) {
    let keywords = req.query.keywords;
    
    let returnData = {
        code:1,
        data:[],
        message:""
    };

    try{
        if(keywords == null || keywords == undefined || keywords == ""){
            throw("invalid param keywords");
        }

        let searchSql = 
        `SELECT id, name FROM ninepurple_accounts_merchant
        WHERE name LIKE '%${keywords}%' and deleted_at is null`;
        console.log("searchSql:", searchSql);
        let searchResult = await db.query(searchSql);
        if(searchResult && searchResult.length > 0){
            for(var i in searchResult) {
                returnData['data'].push(searchResult[i]);
            }
            returnData["code"] = 0;
        }

        return res.json(returnData);

    }catch(error){
        logger.error("getMerchants:", error);
        return res.status(400).send();
    }

});


/**
 * 绑定账号
 */
 app.post('/bindMerchants',async function (req, res) {
    let { message, signature } = req.body;
    
    let returnData = {
        code:1,
        data:[],
        message:""
    };

    message = JSON.parse(message);

    try{
        if(!signature){
            throw("invalid param signature");
        }
        if(!message.mobileNumber){
            throw("invalid param mobileNumber");
        }
        if(!message.selectedMerchant){
            throw("invalid param selectedMerchant");
        }
        if(!message.walletAddress){
            throw("invalid param walletAddress");
        }

        // 使用签名恢复钱包地址
        const messageHash = ethers.utils.hashMessage(JSON.stringify(message));
        const recoveredAddress = ethers.utils.recoverAddress(messageHash, signature);

        // 检查恢复的地址是否与预期的钱包地址匹配
        if (recoveredAddress.toLowerCase() !== message.walletAddress.toLowerCase()) {
            throw("Addresses do not match!");
        }

        // 向商家服务器请求 验证用户电话
        const merchantDataSql = `SELECT * FROM ninepurple_accounts_merchant WHERE id = ? AND deleted_at IS NULL`;
        let merchantDataResult = await db.query(merchantDataSql, [message.selectedMerchant]);
        merchantDataResult = merchantDataResult[0];
        //读取商家命名空间 todo

        //加载商家handler 检查用户手机号

        //绑定
        const checkConsumerSql = `SELECT * FROM ninepurple_accounts_consumer WHERE wallet = ? and mobile = ? and deleted_at IS NULL`;
        const consumerRes = await db.query(checkConsumerSql, [message.walletAddress, message.mobileNumber]);
        let consumerId;
        // console.log("consumerRes ...", consumerRes, consumerRes.length);    
        if(consumerRes.length == 0) {
            const newConsumerSql = `INSERT INTO ninepurple_accounts_consumer (mobile, wallet, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`;
            const newConsumer = await db.query(newConsumerSql, [message.mobileNumber, message.walletAddress]);
            consumerId = newConsumer.insertId;
        }else{   
            consumerId = consumerRes[0].id;
        }
        const newConsumerMerchantSql = `INSERT INTO ninepurple_accounts_consumers_merchants (consumer_id, merchant_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`;
        await db.query(newConsumerMerchantSql, [consumerId, message.selectedMerchant]);

        returnData['code'] = 0;
        return res.json(returnData);

    }catch(error){
        logger.error("bindMerchants:", error);
        return res.status(400).send();
    }

});


main();
async function main (){
    
}   

logger.info(`start script\n`);



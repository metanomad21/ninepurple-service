const fs = require('fs');
var log4js = require('log4js');
let logerr = log4js.getLogger("errors");
const w3utils = require('web3-utils');
const path = require('path');
const ethers = require('ethers');
const axios = require('axios');


exports.toBytes32 = key => w3utils.rightPad(w3utils.asciiToHex(key), 64);

exports.readJson = function (filePath) {
    jsonObj = {};
    if(fs.existsSync(filePath)){
        try {
            //jsonObj = require(filePath); // fuckoff, the `require` method alway return the loaded obj, never reload the file.
            jsonObj = JSON.parse(fs.readFileSync(filePath));
        } catch (error) {
            logerr.error("readJson error:", error);
        }
    }
    return jsonObj;
}

exports.writeJson = function(jsonObj, filePath) {
    fs.writeFileSync(filePath, JSON.stringify(jsonObj, null, 2));
}

exports.getAbi = function(tokenname,netStr = "") {
    var abiPath = path.join(__dirname, '../', "abis/", netStr ,tokenname + ".json");
    var fileconten = fs.readFileSync(abiPath)
    var abi = JSON.parse(fileconten).abi;
    return abi;
}

exports.formatAddressToByte32 = function(address) {
    return ethers.utils.hexlify(ethers.utils.zeroPad(address, 32));
}

exports.checkAddress = function(list, address){
    for(let i in list){
        if(ethers.utils.getAddress(list[i]) == ethers.utils.getAddress(address)){
            return true;
        }
    }

    return false;
}


exports.getRequest = async function(url, headersKey = undefined, params = undefined) {
    return axios
        .get(url, { headers: headersKey, params: params })
        .then(function (response) {
            return Promise.resolve(response);
        })
        .catch(function (error) {
            return Promise.reject(error);
        });
}


//验证交易的封装
exports.verifyTransaction = async function (transactionHash,tindex,netID){
    let netStr = "ETH";
    let revNetStr = "BSC";

    if(speeds.isBinanceNetwork(netID)){
        netStr = "BSC";
        revNetStr = "ETH";
    }
    let hashStr = netStr + transactionHash;
    redis.setRedis(hashStr,tindex);  //写入redis是为了防止未等待到结果的情况下脚本停止
    logger.info(`[${netStr}] 验证交易中...,tran.hash[${transactionHash}]\n`);

    try{
        //验证交易，失败的交易记录起来
        let status = await waitForTransaction(transactionHash,netID);
        if(status){
            logger.info(`[${netStr}] Trade package successful: [${transactionHash}]\n`);
        }else{
            //bsc的验证失败代表eth的冻结交易同步失败，应该是反向记的情况
            let ketStr = revNetStr + "V2ErrIndex" + tindex;

            redis.setRedis(ketStr.toString(),tindex);

            logger.error(`[${netStr}] Deal packaging fails: [${transactionHash}]\n`);
            logger.info(`[${netStr}] Synchronous transaction failure index: [${tindex}]\n`);
        }
        
        redis.delRedis(hashStr); //删除掉等待池里的hash
        return status;
    }catch(e){
        logger.error(`[${netStr}] verifyTransaction error:[${e}]\n`);
    }
}

//等待交易结果
async function waitForTransaction(transactionHash,netID) {
    let provider = providerRopsten;
    if(speeds.isBinanceNetwork(netID)){
        provider = providerBscTest;
    }

    return new Promise(resolve => {
        const check = async () => {
            const transactionInformation = await provider.getTransaction(
                transactionHash
            );
            if (transactionInformation &&transactionInformation.blockHash) {

                const transactionInfo = await provider.getTransactionReceipt(
                    transactionHash
                );
                resolve(transactionInfo.status == 1);
            } else {
                setTimeout(check, 3000);
            }
        };

        check();
    });
}
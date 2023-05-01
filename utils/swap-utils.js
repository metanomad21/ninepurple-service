const UNISWAP = require('@uniswap/sdk');
const {computePairAddress} = require('custom-uniswap-v2-sdk');
const ethers = require('ethers');
const IUniswapV2Pair = require('@uniswap/v2-core/build/IUniswapV2Pair.json');
const UniswapV2Router02ABI = require('../abis/UniswapV2Router02.json');
const IUniswapV2PairABI = IUniswapV2Pair.abi;
// const {Currency, CurrencyAmount} = require('@uniswap/sdk-core');


/**
 * 检索长交易链 并缓存。优先3层 最多4层
 */
exports.genRouting = function (){

}

getFactoryAddress = function(chainId) {
    let factoryAddress = null;
    if(chainId == 1){
        factoryAddress = UNISWAP.FACTORY_ADDRESS;
        initCodeHash = UNISWAP.INIT_CODE_HASH;
    }else{
        factoryAddress = "0x14dE35A05f29bD9e971254D4d8536F6fE3EA5873";
        initCodeHash = "0xf4feb04e77d93f2fe9b2d214ff1e2be5ea1b2419f9e01aeeeb1363e763a32354";
    }
    return factoryAddress;
}

getInitCodeHash = function(chainId) {
    let initCodeHash = null;
    if(chainId == 1){
        initCodeHash = UNISWAP.INIT_CODE_HASH;
    }else{
        initCodeHash = "0xf4feb04e77d93f2fe9b2d214ff1e2be5ea1b2419f9e01aeeeb1363e763a32354";
    }

    return initCodeHash;
}

exports.getPairReserves = async function(tokenAAddr, tokenBAddr, decimalsA, decimalsB, provider, wallet) {
    
    let network = await provider.getNetwork();

    let initCodeHash = getInitCodeHash(network.chainId);
    let factoryAddress = getFactoryAddress(network.chainId);
    // console.log("New token :", network.chainId, tokenAAddr, decimalsA, "");
    let tokenIn = new UNISWAP.Token(network.chainId, tokenAAddr, decimalsA, "");
    let tokenOut = new UNISWAP.Token(network.chainId, tokenBAddr, decimalsB, "");
    let pairAddress = computePairAddress({initCodeHash:initCodeHash, factoryAddress: factoryAddress, tokenA:tokenIn, tokenB:tokenOut});
    let [reserve0, reserve1, blockTime] = await getReserves(pairAddress, wallet);
    return [reserve0, reserve1];
}

exports.estimatedGasSwap = async function(amountIn, amountOutMin, path, to, deadline, wallet) {
    let routerv2Addr = "0x1f33D1C5B2D47a99f270aC40D1Ad4613f4CeB801";
    let routerObj = new ethers.Contract(routerv2Addr, UniswapV2Router02ABI, wallet);
    // console.log("Enter estimatedGasSwap ...:", amountIn, amountOutMin, path, to, deadline, wallet);
    return await routerObj.estimateGas.swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline);
}

/**
 * 实时获取交易链 一级白名单
 */
exports.getUniRouting = async function(db, inAddr, outAddr, tokenAmountString, provider, wallet, isIn) {

    let network = await provider.getNetwork();

    //实例化UNI Factory
    let factoryAddress = getFactoryAddress(network.chainId);
    let initCodeHash = getInitCodeHash(network.chainId);
    console.log('Factory Addr:', factoryAddress);
    console.log('InitCodeHash:', initCodeHash);

    let baseSql = `select * from 9purple_swap_routing_config where chainId = "${network.chainId}" and status = 1 and isBase = 1`;
    let baseResult = await db.query(baseSql);
    
    if(baseResult.length > 0){
        
        //取in out token
        let inSql = `select * from 9purple_swap_routing_config where chainId = "${network.chainId}" and status = 1 and address = "${inAddr}" limit 1`;
        let inResult = await db.query(inSql);
        let outSql = `select * from 9purple_swap_routing_config where chainId = "${network.chainId}" and status = 1 and address = "${outAddr}" limit 1`;
        let outResult = await db.query(outSql);
        if(!(inResult.length > 0 && outResult.length > 0)){
            return null;
        }
        inResult = inResult[0];
        outResult = outResult[0];

        let tokenIn = new UNISWAP.Token(network.chainId, inAddr, inResult['decimals'], inResult['symbol']);
        let tokenOut = new UNISWAP.Token(network.chainId, outAddr, outResult['decimals'], outResult['symbol']);
        let tokenAmount;
        if(isIn) {
            tokenAmount = new UNISWAP.TokenAmount(tokenIn, tokenAmountString.toString());
        }else{
            tokenAmount = new UNISWAP.TokenAmount(tokenOut, tokenAmountString.toString());
        }
        // console.log("tokenAmount res :", tokenAmount);
        let allPair = [];

        for(var i in baseResult){
            console.log("Fetch:", baseResult[i]['symbol']);
            i = parseInt(i);
            let tokenMid = new UNISWAP.Token(network.chainId, baseResult[i]['address'], baseResult[i]['decimals'], baseResult[i]['symbol']);
            
            //in对mid
            try{
                let pairAddress = computePairAddress({initCodeHash:initCodeHash, factoryAddress: factoryAddress, tokenA:tokenIn, tokenB:tokenMid});
                let [reserve0, reserve1, blockTime] = await getReserves(pairAddress, wallet);
                let [token0, token1] = tokenIn.sortsBefore(tokenMid) ? [tokenIn, tokenMid] : [tokenMid, tokenIn];
                let pair = new UNISWAP.Pair(
                    new UNISWAP.TokenAmount(token0, reserve0),
                    new UNISWAP.TokenAmount(token1, reserve1)
                );
                
                allPair.push(pair);
                console.log("1Add Pair:", pair.token0.symbol, pair.token1.symbol);
                
            }catch(fetchErr){
                console.log("1not match...", fetchErr);
                // continue;
            }

            //mid对out
            try{
                
                let pairAddress = computePairAddress({initCodeHash:initCodeHash, factoryAddress: factoryAddress, tokenA:tokenMid, tokenB:tokenOut});
                let [reserve0, reserve1, blockTime] = await getReserves(pairAddress, wallet);
                let [token0, token1] = tokenMid.sortsBefore(tokenOut) ? [tokenMid, tokenOut] : [tokenOut, tokenMid];
                let pair = new UNISWAP.Pair(
                    new UNISWAP.TokenAmount(token0, reserve0),
                    new UNISWAP.TokenAmount(token1, reserve1)
                );
                
                allPair.push(pair);
                console.log("2Add Pair:", pair.token0.symbol, pair.token1.symbol);
                
            }catch(fetchErr){
                console.log("2not match...", fetchErr);
                // continue;
            }

            //mid对mid
            // if(i+1 < baseResult.length){
            //     for(let j = i+1; j < baseResult.length; j++){
            //         let tokenMid2 = new UNISWAP.Token(network.chainId, baseResult[j]['address'], baseResult[j]['decimals'], baseResult[j]['symbol']);
            //         // console.log("M-M:", tokenMid.symbol, tokenMid2.symbol);
            //         //min1对mid2
            //         try{
            //             let pairAddress = computePairAddress({initCodeHash:initCodeHash, factoryAddress: factoryAddress, tokenA:tokenMid, tokenB:tokenMid2});
            //             let [reserve0, reserve1, blockTime] = await getReserves(pairAddress, wallet);
            //             let [token0, token1] = tokenMid.sortsBefore(tokenMid2) ? [tokenMid, tokenMid2] : [tokenMid2, tokenMid];
            //             let pair = new UNISWAP.Pair(
            //                 new UNISWAP.TokenAmount(token0, reserve0),
            //                 new UNISWAP.TokenAmount(token1, reserve1)
            //             );
                        
            //             allPair.push(pair);
            //             console.log("3Add Pair:", pair.token0.symbol, pair.token1.symbol);
                        
            //         }catch(fetchErr){
            //             console.log("3not match...", fetchErr);
            //             // continue;
            //         }
            //     }
            // }

        }

        if(allPair.length > 0){
            let bestRes;
            if(isIn) {
                bestRes = UNISWAP.Trade.bestTradeExactIn(
                    allPair,
                    tokenAmount,
                    tokenOut,
                    {maxNumResults:1, maxHops: 2}
                );
            }else{
                console.log("Before bestTradeExactOut :", allPair[0]['tokenAmounts'], inAddr, outAddr, tokenAmountString);
                bestRes = UNISWAP.Trade.bestTradeExactOut(
                    allPair,
                    tokenIn,
                    tokenAmount,
                    {maxNumResults:1, maxHops: 2}
                );
            }
            console.log("Best:", bestRes[0]);
            // console.log("===:", bestRes[0].executionPrice.numerator.toString(), bestRes[0].executionPrice.denominator.toString());
            // console.log("----:", (bestRes[0].executionPrice.numerator/bestRes[0].executionPrice.denominator).toString());
            if(bestRes.length > 0){
                let deltaDecimals;
                let baseFormat = bestRes[0].executionPrice.denominator;
                let quoteFormat = bestRes[0].executionPrice.numerator;
                if(bestRes[0].executionPrice.baseCurrency.decimals > bestRes[0].executionPrice.quoteCurrency.decimals) {
                    deltaDecimals = bestRes[0].executionPrice.baseCurrency.decimals - bestRes[0].executionPrice.quoteCurrency.decimals;
                    quoteFormat = quoteFormat * ethers.utils.parseUnits("1", deltaDecimals);
                }else{
                    deltaDecimals = bestRes[0].executionPrice.quoteCurrency.decimals - bestRes[0].executionPrice.baseCurrency.decimals;
                    baseFormat = baseFormat * ethers.utils.parseUnits("1", deltaDecimals);
                }
                // console.log("Price:", quoteFormat, baseFormat, quoteFormat/baseFormat);
                console.log(bestRes[0].priceImpact.numerator.toString()/bestRes[0].priceImpact.denominator.toString());
                return {
                    "routing": bestRes[0].route.path,
                    "inAmount": bestRes[0].inputAmount.numerator.toString(),
                    "outAmount": bestRes[0].outputAmount.numerator.toString(),
                    "price": quoteFormat/baseFormat,
                    "priceImpact": bestRes[0].priceImpact.numerator.toString()/bestRes[0].priceImpact.denominator.toString(),
                    "tokenData":{
                        in:bestRes[0].route.input,
                        out:bestRes[0].route.output
                    }
                };
            }

        }

        return null;
    }
}

getReserves = async function(pairAddress, wallet) {
    console.log("PAIR:", pairAddress);
    let pairObj = new ethers.Contract(pairAddress, IUniswapV2PairABI, wallet);
    let reserves = await pairObj.getReserves();

    return reserves;
}


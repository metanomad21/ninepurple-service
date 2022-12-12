const pageResults = require("graph-results-pager");
const {graphAPIEndpoints} = require("./graphAPIEndpoints.js");

const maxRequest = 1000;

module.exports = {
    pageResults,
    graphAPIEndpoints,
    data: {
        getTokenDeposited({
            max = maxRequest,
            chainName = "heco",
            endBlockHeight = undefined,
            strartTimestamp = undefined,
            endTimestamp = undefined,
            depositId = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "tokenDeposits",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: strartTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            depositId_gt: depositId || undefined
                        }
                    },
                    properties: [
                        "id", "srcChainId", "destChainId", "depositId", "depositor", "recipient", "currency", "amount", "preGasFee", "blockHeight", "txHash", "timestamp", "minOut"
                    ]
                },

            }).then(results =>
                results.map(({ id, srcChainId, destChainId, depositId, depositor, recipient, currency, amount, preGasFee, blockHeight, txHash, timestamp,minOut }) => ({
                    id,
                    srcChainId,
                    destChainId,
                    depositId,
                    depositor,
                    recipient,
                    currency,
                    amount,
                    preGasFee,
                    blockHeight,
                    txHash,
                    timestamp,
                    minOut
                }))
            )
            .catch(err => console.error(err));
        }
    }

};
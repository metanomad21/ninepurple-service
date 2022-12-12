const pageResults = require("graph-results-pager");
const {graphAPIEndpoints} = require("../../conf/orgCfg.js");

const maxRequest = 1000;

module.exports = {
    pageResults,
    graphAPIEndpoints,
    data: {
        getTokenDeposited({
            max = maxRequest,
            chainName = "okex",
            startBlockHeight = undefined,
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
                        "id", "srcChainId", "destChainId", "depositId", "depositor", "recipient", "currency", "amount", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, srcChainId, destChainId, depositId, depositor, recipient, currency, amount, blockHeight, txHash, timestamp }) => ({
                    id,
                    srcChainId,
                    destChainId,
                    depositId,
                    depositor,
                    recipient,
                    currency,
                    amount,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        }
    }

};
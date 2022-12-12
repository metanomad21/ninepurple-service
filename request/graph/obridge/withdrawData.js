const pageResults = require("graph-results-pager");
const {graphAPIEndpoints} = require("./graphAPIEndpoints.js");

const maxRequest = 1000;

module.exports = {
    pageResults,
    graphAPIEndpoints,
    data: {
        getTokenWithdrawed({
            max = maxRequest,
            chainName = "heco",
            currency = undefined,
            strartTimestamp = undefined,
            endTimestamp = undefined,
            depositId = undefined,
            indexString = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "tokenWithdrawals",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            currency_eq: currency || undefined,
                            timestamp_gte: strartTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            depositId_lte: depositId || undefined,
                            id_eq: indexString || undefined
                        }
                    },
                    properties: [
                        "id", "srcChainId", "destChainId", "depositId", "depositor", "recipient", "currency", "amount", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, srcChainId, destChainId, depositId, depositor, recipient, currency, amount, txHash, timestamp }) => ({
                    id,
                    srcChainId,
                    destChainId,
                    depositId,
                    depositor,
                    recipient,
                    currency,
                    amount,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        }
    }

};
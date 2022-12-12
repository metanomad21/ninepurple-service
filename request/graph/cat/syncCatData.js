const pageResults = require("graph-results-pager");
const {graphAPIEndpoints} = require("./graphAPIEndpoints.js");

const maxRequest = 1000;
const defaultChainName = "bsc";

module.exports = {
    pageResults,
    graphAPIEndpoints,
    data: {
        getCatTokenTransfer({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "catTokenTransfers",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "from", "to", "value", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, from, to, value, blockHeight, txHash, timestamp }) => ({
                    id,
                    from,
                    to,
                    value,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getCatTokenApproval({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "catTokenApprovals",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "owner", "spender", "value", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, owner, spender, value, blockHeight, txHash, timestamp }) => ({
                    id,
                    owner,
                    spender,
                    value,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getCatTokenOwnershipTransferred({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "catTokenOwnershipTransferreds",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "previousOwner", "newOwner", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, previousOwner, newOwner, blockHeight, txHash, timestamp }) => ({
                    id,
                    previousOwner,
                    newOwner,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getCatTokenMinTokensBeforeSwapUpdated({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "catTokenMinTokensBeforeSwapUpdateds",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "minTokensBeforeSwap", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, minTokensBeforeSwap, blockHeight, txHash, timestamp }) => ({
                    id,
                    minTokensBeforeSwap,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getCatTokenSwapAndLiquifyEnabledUpdated({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "catTokenSwapAndLiquifyEnabledUpdateds",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "enabled", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, enabled, blockHeight, txHash, timestamp }) => ({
                    id,
                    enabled,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getCatTokenSwapAndLiquify({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "catTokenSwapAndLiquifies",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "tokensSwapped", "ethReceived", "tokensIntoLiqudity", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, tokensSwapped, ethReceived, tokensIntoLiqudity, blockHeight, txHash, timestamp }) => ({
                    id,
                    tokensSwapped,
                    ethReceived,
                    tokensIntoLiqudity,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatTransfer({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatTransfers",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "from", "to", "tokenId", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, from, to, tokenId, blockHeight, txHash, timestamp }) => ({
                    id,
                    from,
                    to,
                    tokenId,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatApproval({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatApprovals",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "owner", "approved", "tokenId", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, owner, approved, tokenId, blockHeight, txHash, timestamp }) => ({
                    id,
                    owner,
                    approved,
                    tokenId,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatApprovalForAll({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatApprovalForAlls",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "owner", "spender", "approved", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, owner, spender, approved, blockHeight, txHash, timestamp }) => ({
                    id,
                    owner,
                    spender,
                    approved,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatActiveUnactive({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatActiveUnactives",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "catId", "slotId", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, catId, slotId, blockHeight, txHash, timestamp }) => ({
                    id,
                    catId,
                    slotId,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatActiveActive({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatActiveActives",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "catId", "slotId", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, catId, slotId, blockHeight, txHash, timestamp }) => ({
                    id,
                    catId,
                    slotId,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatBabyTransfer({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatBabyTransfers",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "from", "to", "tokenId", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, from, to, tokenId, blockHeight, txHash, timestamp }) => ({
                    id,
                    from,
                    to,
                    tokenId,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatBabyApproval({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatBabyApprovals",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "owner", "approved", "tokenId", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, owner, approved, tokenId, blockHeight, txHash, timestamp }) => ({
                    id,
                    owner,
                    approved,
                    tokenId,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatBabyApprovalForAll({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatBabyApprovalForAlls",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "owner", "approved", "spender", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, owner, approved, spender, blockHeight, txHash, timestamp }) => ({
                    id,
                    owner,
                    approved,
                    spender,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatBornPregnancy({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatBornPregnancies",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "sender", "lv", "rate", "tokenid", "mother", "rand", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, sender, lv, rate, tokenid, mother, rand, blockHeight, txHash, timestamp }) => ({
                    id,
                    sender,
                    lv,
                    rate,
                    tokenid,
                    mother,
                    rand,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatBornFeed({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatBornFeeds",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "sender", "tokenid", "fee", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, sender, tokenid, fee, blockHeight, txHash, timestamp }) => ({
                    id,
                    sender,
                    tokenid,
                    fee,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatBornSpeed({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatBornSpeeds",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "sender", "tokenid", "fee", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, sender, tokenid, fee, blockHeight, txHash, timestamp }) => ({
                    id,
                    sender,
                    tokenid,
                    fee,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatBornBorn({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatBornBorns",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "sender", "tokenid", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, sender, tokenid, blockHeight, txHash, timestamp }) => ({
                    id,
                    sender,
                    tokenid,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatBornGrowUp({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatBornGrowUps",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "sender", "mother", "babyId", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, sender, mother, babyId, blockHeight, txHash, timestamp }) => ({
                    id,
                    sender,
                    mother,
                    babyId,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatExchangeExchangeToken({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatExchangeExchangeTokens",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "sender", "lv", "tokenid", "sex", "grade", "stype", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, sender, lv, tokenid, sex, grade, stype, blockHeight, txHash, timestamp }) => ({
                    id,
                    sender,
                    lv,
                    tokenid,
                    sex,
                    grade,
                    stype,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatSaleSaleCat({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatSaleSaleCats",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "sender", "tokenid", "saleId", "grade", "stype", "sex", "price", "type", "minPrice", "priceDuration", "isAuction", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, sender, tokenid, saleId, grade, stype, sex, price, type, minPrice, priceDuration, isAuction, blockHeight, txHash, timestamp }) => ({
                    id,
                    sender,
                    tokenid,
                    saleId,
                    grade,
                    sex,
                    price,
                    type,
                    minPrice,
                    priceDuration,
                    isAuction,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatSaleBuyCat({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatSaleBuyCats",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "sender", "tokenid", "buyId", "price", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, sender, tokenid, buyId, price, blockHeight, txHash, timestamp }) => ({
                    id,
                    sender,
                    tokenid,
                    buyId,
                    price,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatSaleWithdrawCat({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatSaleWithdrawCats",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "sender", "tokenid", "withdrawId", "tax", "money", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, sender, tokenid, withdrawId, tax, money, blockHeight, txHash, timestamp }) => ({
                    id,
                    sender,
                    tokenid,
                    withdrawId,
                    tax,
                    money,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTCatSaleAdminWithdrawToken({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftcatSaleAdminWithdrawTokens",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "sender", "eth", "cp", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, sender, eth, cp, blockHeight, txHash, timestamp }) => ({
                    id,
                    sender,
                    eth,
                    cp,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTPoolStake({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftpoolStakes",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "user", "tokenids", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, user, tokenids, blockHeight, txHash, timestamp }) => ({
                    id,
                    user,
                    tokenids,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTPoolWithdraw({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftpoolWithdraws",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "user", "tokenids", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, user, tokenids, blockHeight, txHash, timestamp }) => ({
                    id,
                    user,
                    tokenids,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTPoolWithdrawReward({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftpoolWithdrawRewards",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "user", "reward", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, user, reward, blockHeight, txHash, timestamp }) => ({
                    id,
                    user,
                    reward,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTPoolSetStartTime({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftpoolSetStartTimes",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "admin", "startTime", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, admin, startTime, blockHeight, txHash, timestamp }) => ({
                    id,
                    admin,
                    startTime,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTPoolSetEndTime({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftpoolSetEndTimes",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "admin", "endTime", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, admin, endTime, blockHeight, txHash, timestamp }) => ({
                    id,
                    admin,
                    endTime,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTPoolAdminWithdrawNFT({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftpoolAdminWithdrawNFTs",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "addr", "operator", "to", "tokenId", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, addr, operator, to, tokenId, blockHeight, txHash, timestamp }) => ({
                    id,
                    addr,
                    operator,
                    to,
                    tokenId,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTPoolAdminWithdrawToken({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftpoolAdminWithdrawTokens",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "addr", "operator", "to", "amount", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, addr, operator, to, amount, blockHeight, txHash, timestamp }) => ({
                    id,
                    addr,
                    operator,
                    to,
                    amount,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTSlotTransfer({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftslotTransfers",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "from", "to", "tokenId", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, from, to, tokenId, blockHeight, txHash, timestamp }) => ({
                    id,
                    from,
                    to,
                    tokenId,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTSlotApproval({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftslotApprovals",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "owner", "approved", "tokenId", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, owner, approved, tokenId, blockHeight, txHash, timestamp }) => ({
                    id,
                    owner,
                    approved,
                    tokenId,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTSlotApprovalForAll({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftslotApprovalForAlls",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "owner", "spender", "approved", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, owner, spender, approved, blockHeight, txHash, timestamp }) => ({
                    id,
                    owner,
                    spender,
                    approved,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        },

        getNFTSlotBuyBuySlotToken({
            max = maxRequest,
            chainName = defaultChainName,
            startBlockHeight = undefined,
            endBlockHeight = undefined,
            startTimestamp = undefined,
            endTimestamp = undefined
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[chainName],
                max,
                query: {
                    entity: "nftslotBuyBuySlotTokens",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "asc",
                        where: {
                            timestamp_gte: startTimestamp || undefined,
                            timestamp_lte: endTimestamp || undefined,
                            blockHeight_gte: startBlockHeight || undefined,
                            blockHeight_lte: endBlockHeight || undefined
                        }
                    },
                    properties: [
                        "id", "sender", "lv", "tokenid", "stype", "blockHeight", "txHash", "timestamp"
                    ]
                },

            }).then(results =>
                results.map(({ id, sender, lv, tokenid, stype, blockHeight, txHash, timestamp }) => ({
                    id,
                    sender,
                    lv,
                    tokenid,
                    stype,
                    blockHeight,
                    txHash,
                    timestamp
                }))
            )
            .catch(err => console.error(err));
        }
    }

};
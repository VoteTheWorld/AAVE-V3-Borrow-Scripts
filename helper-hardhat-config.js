const networkConfig = {
    default: {
        name: "hardhat",
        keepersUpdateInterval: "30",
    },
    31337: {
        name: "localhost",
        subscriptionId: "588",
        gasLane:
            "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: "100000000000000000", // 0.1 ETH
        callbackGasLimit: "500000", // 500,000 gas
        wethToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        daiToken: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        poolAddressesProvider: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
        daiEthPriceFeed: "0x773616E4d11A78F511299002da57A0a94577F1f4",
        daiUSDPriceFeed: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
    },
    5: {
        name: "goerli",
        subscriptionId: "588",
        gasLane:
            "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: "100000000000000000", // 0.1 ETH
        callbackGasLimit: "500000", // 500,000 gas
        wethToken: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        daiToken: "0x73967c6a0904aA032C103b4104747E88c566B1A2",
        poolAddressesProvider: "0xC911B590248d127aD18546B186cC6B324e99F02c",
        daiUSDPriceFeed: "0x0d79df66BE487753B02D015Fb622DED7f0E9798d",
    },
    1: {
        name: "mainnet",
        keepersUpdateInterval: "30",
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
}

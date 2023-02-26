const { getNamedAccounts, ethers, network } = require("hardhat")
const { getWeth, AMOUNT } = require("../scripts/getWETH")
const { networkConfig } = require("../helper-hardhat-config")

async function main() {
    const { deployer } = await getNamedAccounts()
    const pool = await getPoolAddress(deployer)
    wethTokenAddress = networkConfig[network.config.chainId].wethToken

    console.log("Depositing WETH...")
    const txResponse = await pool.deposit(wethTokenAddress, AMOUNT, deployer, 0)
    await txResponse.wait(1)
    console.log(`Desposited ${AMOUNT} WETH`)
}

async function getPoolAddress(account) {
    const poolAddressesProvider = await ethers.getContractAt(
        "IpoolAddressesProvider",
        networkConfig[network.config.chainId].poolAddressesProvider,
        account
    )
    const pooladdress = await poolAddressesProvider.getPool()
    console.log(`Pool address is ${pooladdress}`)
    const pool = await ethers.getContractAt("Ipool", pooladdress, account)
    return pool
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

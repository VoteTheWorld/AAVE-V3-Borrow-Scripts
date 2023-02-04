const { getNamedAccounts, ethers, network } = require("hardhat")
const { getWeth, AMOUNT } = require("../scripts/getWETH")
const { networkConfig } = require("../helper-hardhat-config")

async function main() {
    await getWeth()
    const { deployer } = await getNamedAccounts()
    const pool = await getPoolAddress(deployer)
    wethTokenAddress = networkConfig[network.config.chainId].wethToken
    await approveErc20(wethTokenAddress, pool.address, AMOUNT, deployer)

    console.log("Depositing WETH...")
    const txResponse = await pool.deposit(wethTokenAddress, AMOUNT, deployer, 0)
    await txResponse.wait(6)
    console.log(`Desposited ${AMOUNT} WETH`)

    let { availableBorrowsBase } = await getBorrowUserData(pool, deployer)
    const daiPrice = await getDaiPrice()
    const amountDaiToBorrow =
        availableBorrowsBase.toString() * 0.95 * (1 / daiPrice.toNumber())
    const amountDaiToBorrowWei = ethers.utils.parseEther(
        amountDaiToBorrow.toString()
    )
    console.log(`You can borrow ${amountDaiToBorrow.toString()} DAI`)

    await borrowDai(
        networkConfig[network.config.chainId].daiToken,
        pool,
        amountDaiToBorrowWei,
        deployer
    )
    await getBorrowUserData(pool, deployer)

    await repay(
        amountDaiToBorrowWei,
        networkConfig[network.config.chainId].daiToken,
        pool,
        deployer
    )
    await getBorrowUserData(pool, deployer)
}

async function repay(amountToRepay, tokenAddress, poolAddress, account) {
    await approveErc20(wethTokenAddress, pool.address, AMOUNT, deployer)
    const txResponse = await poolAddress.repay(
        tokenAddress,
        amountToRepay,
        1,
        account
    )
    await txResponse.wait(1)
    console.log("Repay successfully!")
}

async function borrowDai(tokenAddress, poolAddress, amountToBorrow, account) {
    const borrowTx = await poolAddress.borrow(
        tokenAddress,
        amountToBorrow,
        1,
        0,
        account
    )
    await borrowTx.wait(1)
    console.log("Borrow successfully!")
}

async function getPoolAddress(account) {
    const poolAddressesProvider = await ethers.getContractAt(
        "IpoolAddressesProvider",
        networkConfig[network.config.chainId].poolAddressesProvider,
        account
    )
    const pooladdress = await poolAddressesProvider.getPool()
    const pool = await ethers.getContractAt("Ipool", pooladdress, account)
    return pool
}

async function approveErc20(tokenAddress, pooladdress, Amount, signer) {
    const Erc20 = await ethers.getContractAt("IERC20", tokenAddress, signer)
    const txResponse = await Erc20.approve(pooladdress, Amount)
    await txResponse.wait(1)
    console.log("Approved!")
}

async function getBorrowUserData(pool, account) {
    const { totalCollateralBase, totalDebtBase, availableBorrowsBase } =
        await pool.getUserAccountData(account)
    console.log(`You have ${totalCollateralBase} worth of ETH deposited.`)
    console.log(`You have ${totalDebtBase} worth of ETH borrowed.`)
    console.log(`You can borrow ${availableBorrowsBase} worth of ETH.`)
    return { availableBorrowsBase, totalDebtBase }
}

async function getDaiPrice() {
    const daiEthPriceFeed = await ethers.getContractAt(
        "AggregatorV3Interface",
        networkConfig[network.config.chainId].daiUSDPriceFeed
    )

    const priceFeed = (await daiEthPriceFeed.latestRoundData())[1]
    console.log(`The DAI/USD price is ${priceFeed}`)
    return priceFeed
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

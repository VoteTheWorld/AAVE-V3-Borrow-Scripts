const { getNamedAccounts, ethers } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

const AMOUNT = ethers.utils.parseEther("0.1")

async function getWeth() {
    const { deployer } = await getNamedAccounts()
    const IWeth = await ethers.getContractAt(
        "IWeth",
        networkConfig[network.config.chainId].wethToken,
        deployer
    )

    const txResponse = await IWeth.deposit({ value: AMOUNT })
    await txResponse.wait(1)

    const wethBalance = await IWeth.balanceOf(deployer)
    console.log(`Balance of this account has ${wethBalance} WETH`)
}

module.exports = { getWeth, AMOUNT }

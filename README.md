# AAVE v3-core borrow scripts

1. get WETH address
2. deposit eth and get weth (after approve)
3. get user data to see how much we can borrow
4. calculate the amount we want to borrow
5. borrow from the pool contract
6. repay to the contract(after approve)

7. `problem` the borrow function in pool contract call another contract which doesnot in the local environment and cannot process

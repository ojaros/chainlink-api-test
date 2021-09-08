const MyContract = artifacts.require('MyContract')
// const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken')
// const { Operator } = require('@chainlink/contracts/truffle/v0.7/Operator')
// const { Oracle } = require('@chainlink/contracts/truffle/v0.6/Oracle')

module.exports = async (deployer, network, [defaultAccount]) => {
  // Local (development) networks need their own deployment of the LINK
  // token and the Oracle contract
  // LinkToken.setProvider(deployer.provider)
  // Operator.setProvider(deployer.provider)

  // try {
  //   await deployer.deploy(LinkToken, { from: defaultAccount })
  //   await deployer.deploy(Operator, LinkToken.address, defaultAccount,  { from: defaultAccount })
  //   await deployer.deploy(MyContract, LinkToken.address, { from: defaultAccount })

  //   const addr = {
  //     linkTokenAddress: LinkToken.address,
  //     operatorAddress: Operator.address,
  //     contractAddress: MyContract.address,
  //   }

  //   console.log(`Link address is ${LinkToken.address}`)
  //   console.log(`Operator address is ${Operator.address}`)
  //   console.log(`Contract address is ${MyContract.address}`)

  // } catch (err) {
  //   console.error(err)
  // }

  if (!network.startsWith('kovan')) {
    LinkToken.setProvider(deployer.provider)
    Oracle.setProvider(deployer.provider)
    try {
      await deployer.deploy(LinkToken, { from: defaultAccount })
      await deployer.deploy(Oracle, LinkToken.address, { from: defaultAccount })
      await deployer.deploy(MyContract, LinkToken.address)
    } catch (err) {
      console.error(err)
    }
  } else {
    // For kovan networks, use the 0 address to allow the ChainlinkRegistry
    // contract automatically retrieve the correct address for you
    deployer.deploy(MyContract, '0x0000000000000000000000000000000000000000')
  }
}

const RandomNumberConsumer = artifacts.require('RandomNumberConsumer')

// const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken')
const RINKEBY_KEYHASH = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311'
const RINKEBY_FEE = '100000000000000000'
const RINKEBY_LINK_TOKEN = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
const RINKEBY_VRF_COORDINATOR = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B'


module.exports = async (deployer, network, [defaultAccount]) => {
    // Local (development) networks need their own deployment of the LINK
    // token and the Oracle contract
    if (!network.startsWith('rinkeby')) {
        console.log("only for rinkeby right now!")
    } else {
        // For now, this is hard coded to Kovan
        // const KOVAN_KEYHASH = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4'
        // const KOVAN_FEE = '100000000000000000'
        // const KOVAN_LINK_TOKEN = '0xa36085F69e2889c224210F603D836748e7dC0088'
        // const KOVAN_VRF_COORDINATOR = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9'
        deployer.deploy(RandomNumberConsumer, RINKEBY_LINK_TOKEN, RINKEBY_KEYHASH, RINKEBY_VRF_COORDINATOR, RINKEBY_FEE)
    }
}

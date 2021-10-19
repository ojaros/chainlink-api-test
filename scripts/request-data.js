const MyContract = artifacts.require('MyContract')

/*
  This script allows for a Chainlink request to be created from
  the requesting contract. Defaults to the Chainlink oracle address
  on this page: https://docs.chain.link/docs/decentralized-oracles-ethereum-mainnet/#testnets
*/

// const oracleAddress =
//   process.env.TRUFFLE_CL_BOX_ORACLE_ADDRESS ||
//   '0xF405B99ACa8578B9eb989ee2b69D518aaDb90c1F'
// const jobId =
//   process.env.TRUFFLE_CL_BOX_JOB_ID || '7c4b968028f74b2eabd7d428f03ba45c'
// const payment = process.env.TRUFFLE_CL_BOX_PAYMENT || '1000000000000000000'
const url =
  process.env.TRUFFLE_CL_BOX_URL ||
  'https://esports.videogram.com/social/manga/a55b7f54-4254-468f-ab4a-0c157120089e/gridv2/?album_uuid=06606864-a313-4a16-8bc0-8f28173d5ced&width=384&height=400&unit_width=60&max_size=4&margin_width=2&x_margin=2&y_margin=2&layout=grid&subframes=false&frames=true'
const path = process.env.TRUFFLE_CL_BOX_JSON_PATH || 'grid.elements.0.url'
// const times = process.env.TRUFFLE_CL_BOX_TIMES || '100'

const name = 'TestNFT'

module.exports = async callback => {
  const mc = await MyContract.deployed()
  console.log('Creating request on contract:', mc.address)
  const tx = await mc.createRequestTo(
    // oracleAddress,
    // web3.utils.toHex(jobId),
    // payment,
    url,
    path,
    name,
    // times,
  )
  console.log('request complete')
  callback(tx.tx)
}

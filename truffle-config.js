// const HDWalletProvider = require('@truffle/hdwallet-provider')
// require('dotenv').config()

// const mnemonic = process.env.MNEMONIC
// const url = process.env.RPC_URL

module.exports = {
  networks: {
    cldev: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    binance_testnet: {
      // provider: () => new HDWalletProvider(mnemonic,'https://data-seed-prebsc-1-s1.binance.org:8545'),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    kovan: {
      // provider: () => {
      //   // return new HDWalletProvider(mnemonic, url)
      // },
      network_id: '42',
      skipDryRun: true
    },
    rinkeby: {
      host: '127.0.0.1',
      port: 8545,
      // provider: () => {
      //   return new HDWalletProvider(mnemonic, url)
      // },
      gas: 4700000,
      from: "0x6773Ec31Aa7719b30A02A3Ab151a2b578eF17842",
      network_id: '4',
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: '0.8.0',
    },
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
  plugins: [
    'truffle-plugin-verify'
  ]
}

require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://mainnet.infura.io/v3/68a0c699f31a482c804f7b757e429c9f",
      accounts: [`0x${"16e5c200b6acd9c9fe0774abf116cf36aa2470ae6cdf70bb08c397a29e0ac41d"}`]
    }
  }
};

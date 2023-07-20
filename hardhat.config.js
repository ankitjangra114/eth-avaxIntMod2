require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  
};
// module.exports = {
//   networks: {
//     hardhat: {
//       chainId: 1337, // Custom chain ID for local Hardhat network
//       accounts: [
//         {
//           privateKey: 'rail estate silly ostrich neglect gentle amount napkin pond trade hip useful',
//           balance: '10000000000000000000000', // 10000 ETH in wei (adjust the balance as needed)
//         },
//       ],
//     },
//   },
//   solidity: "0.8.0", // Specify the version of Solidity you're using
// };

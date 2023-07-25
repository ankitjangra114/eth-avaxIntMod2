const hre = require("hardhat");
async function main() {
  const initBalance = 1;
  const ABC = await hre.ethers.getContractFactory("abc");
  const abc = await ABC.deploy();
  await abc.deployed();
  console.log(`A contract with balance of ${initBalance} eth deployed to ${abc.address}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


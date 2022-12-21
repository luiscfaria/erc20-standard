const hre = require("hardhat");

async function main() {
  let FariaToken = await ethers.getContractFactory("FariaToken");
  FariaToken = await FariaToken.deploy();

  await FariaToken.deployed();
  console.log("FariaToken deployed to:", FariaToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

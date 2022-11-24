const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Faria Token", function () {
  let FariaToken;
  let users, owner, addr1, addr2;

  before(async () => {
    users = await ethers.getSigners();
    owner = users[0];
    addr1 = users[1];
    addr2 = users[2];
    addr3 = users[3];
  });

  describe("Deployment", function () {
    it("Should Deploy Contract", async function () {
      FariaToken = await ethers.getContractFactory("FariaToken");
      FariaToken = await FariaToken.deploy();
      await FariaToken.deployed();
      expect(
        BigNumber.from(await FariaToken.balanceOf(owner.address)).toString()
      ).to.equal("10000000000000000000000");
    });
  });

  describe("Mint", function () {
    it("Should Mint More Tokens", async function () {
      FariaToken = await ethers.getContractFactory("FariaToken");
      FariaToken = await FariaToken.deploy();
      await FariaToken.deployed();
      await FariaToken.mint(owner.address, 1);
      expect(
        BigNumber.from(await FariaToken.balanceOf(owner.address)).toString()
      ).to.equal("10000000000000000000001");
    });
    it("Only Minter Role Should Mint More Tokens", async function () {
      FariaToken = await ethers.getContractFactory("FariaToken");
      FariaToken = await FariaToken.deploy();
      await FariaToken.deployed();
      expect(
        FariaToken.connect(addr1).mint(addr1.address, 1)
      ).to.be.revertedWith(
        "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"
      );
    });
  });
});

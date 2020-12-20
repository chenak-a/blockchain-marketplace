var controler = artifacts.require("./controler.sol");

module.exports = function(deployer) {
  deployer.deploy(controler);
};

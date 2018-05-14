var EnergyProduction = artifacts.require("EnergyProduction");
var EnergyConsumption = artifacts.require("EnergyConsumption");

module.exports = function(deployer) {
  deployer.deploy(EnergyProduction);
  deployer.deploy(EnergyConsumption);
};

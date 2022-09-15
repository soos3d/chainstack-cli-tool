const inquirer = require("inquirer");

const getSelectNetwork = async (networks) => {
  return await inquirer.prompt([
    {
      type: "list",
      name: "networkSelected",
      message: "Select a network: ",
      choices: networks,
    },
  ]);
};

module.exports = {
  getSelectNetwork,
};

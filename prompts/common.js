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

const getSelectProject = async (metadata) => {
  const { projectSelection } = await inquirer.prompt([
    {
      type: "list",
      message: "Select a project to create the network on: ",
      name: "projectSelection",
      choices: metadata,
    },
  ]);

  return projectSelection;
};

module.exports = {
  getSelectNetwork,
  getSelectProject,
};

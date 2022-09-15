const inquirer = require("inquirer");
const { getNetworkSelection } = require("./network");
const { getNodeSelection } = require("./node");

let API_KEY;

const getAPIKey = async () => {
  const { apiKey } = await inquirer.prompt([
    { type: "text", name: "apiKey", message: "Please enter your api key" },
  ]);

  API_KEY = apiKey;

  if (apiKey) {
    await getMainSelection();
  }
};

const getMainSelection = async () => {
  const { mainOption } = await inquirer.prompt([
    {
      type: "list",
      name: "mainOption",
      message: "Select an option from the Chainstack API",
      choices: ["Network Requests", "Node Requests"],
    },
  ]);

  processmainSelection(mainOption);
};

const processmainSelection = async (mainOption) => {
  if (mainOption.includes("Network")) {
    getNetworkSelection(API_KEY);
  }

  if (mainOption.includes("Node")) {
    getNodeSelection(API_KEY);
  }
};

module.exports = { getAPIKey };

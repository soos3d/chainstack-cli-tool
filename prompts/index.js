const inquirer = require("inquirer");
const { getApplicationSelection } = require("./application");
const { getIdentitySelection } = require("./identity");
const { getNetworkSelection } = require("./network");
const { getNodeSelection } = require("./node");
const { getOrganizationSelection } = require("./organization");
const { getProjectSelection } = require("./project");

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
      choices: [
        "Application Requests",
        "Organization Requests",
        "Project Requests",
        "Network Requests",
        "Node Requests",
        "Identity Requests",
      ],
    },
  ]);

  processmainSelection(mainOption);
};

const processmainSelection = async (mainOption) => {
  if (mainOption.includes("Application")) {
    getApplicationSelection(API_KEY);
  }

  if (mainOption.includes("Organization")) {
    getOrganizationSelection(API_KEY);
  }

  if (mainOption.includes("Project")) {
    getProjectSelection(API_KEY);
  }

  if (mainOption.includes("Network")) {
    getNetworkSelection(API_KEY);
  }

  if (mainOption.includes("Node")) {
    getNodeSelection(API_KEY);
  }

  if (mainOption.includes("Identity")) {
    getIdentitySelection(API_KEY);
  }
};

module.exports = { getAPIKey };

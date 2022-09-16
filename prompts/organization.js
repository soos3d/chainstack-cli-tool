const inquirer = require("inquirer");
const {
  getOrganization,
  updateOrganization,
} = require("../requests/organization");

const getOrganizationSelection = async (token) => {
  const { organizationSelection } = await inquirer.prompt([
    {
      type: "list",
      name: "organizationSelection",
      message: "Select the request to perform",
      choices: [
        "Get organization name and id (GET)",
        "Update organization name (PATCH)",
      ],
    },
  ]);

  processOrganizationSelection(organizationSelection, token);
};

const getOrganizationName = async () => {
  return await inquirer.prompt([
    {
      type: "text",
      name: "name",
      message: "Enter a new name for the organization",
    },
  ]);
};

const processOrganizationSelection = async (organizationSelection, token) => {
  if (organizationSelection.includes("Get")) {
    await processGetOrganization(token);
  }

  if (organizationSelection.includes("Update")) {
    await processUpdateOrganization(token);
  }
};

const processGetOrganization = async (token) => {
  const response = await getOrganization(token);

  console.log(response);
};

const processUpdateOrganization = async (token) => {
  const { name } = await getOrganizationName();

  const response = await updateOrganization(name, token);

  console.log(response);
};

module.exports = {
  getOrganizationSelection,
};

const inquirer = require("inquirer");
const {
  extractApplicationsMetadata,
  extractApplicationId,
} = require("../helpers/application");
const {
  listAllApplications,
  retrieveApplication,
} = require("../requests/application");

const getApplicationSelection = async (token) => {
  const { applicationSelection } = await inquirer.prompt([
    {
      type: "list",
      name: "applicationSelection",
      message: "Select the request to perform",
      choices: [
        "List all applications (GET)",
        //"Create application (POST)",
        "Retrieve application (GET)",
        "Delete application (DELETE)",
      ],
    },
  ]);

  processApplicationSelection(applicationSelection, token);
};

const getSelectApplication = async (applications) => {
  return await inquirer.prompt([
    {
      type: "list",
      name: "applicationSelected",
      message: "Select an application: ",
      choices: applications,
    },
  ]);
};

const processApplicationSelection = async (applicationSelection, token) => {
  if (applicationSelection.includes("List")) {
    await processListApplications(token);
  }

  if (applicationSelection.includes("Create")) {
    await processCreateApplication(token);
  }

  if (applicationSelection.includes("Retrieve")) {
    await processRetrieveApplication(token);
  }
};

const processListApplications = async (token) => {
  const response = await listAllApplications(token);

  console.log(response);
};

const processRetrieveApplication = async (token) => {
  const applications = await listAllApplications(token);
  const { metadata, beautified } = extractApplicationsMetadata(applications);
  const { applicationSelected } = await getSelectApplication(beautified);
  const applicationId = extractApplicationId(applicationSelected);

  const response = await retrieveApplication(token, applicationId);
  console.log(response);
};

const processCreateApplication = async (token) => {
  //TODO
  //   const applications = await listAllApplications(token);
  //   const { metadata, beautified } = extractApplicationsMetadata(applications);
  //   const applicationSelected = await getSelectApplication(beautified);
  //   const applicationId = extractApplicationId(applicationSelected);
};

const processDeleteApplication = async (token) => {
  const applications = await listAllApplications(token);
  const { metadata, beautified } = extractApplicationsMetadata(applications);
  const { applicationSelected } = await getSelectApplication(beautified);
  const applicationId = extractApplicationId(applicationSelected);

  const response = await deleteApplication(token, applicationId);
  console.log(response);
};

module.exports = {
  getApplicationSelection,
};

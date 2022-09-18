const inquirer = require("inquirer");
const {
  extractIdentityId,
  extractIdentityData,
} = require("../helpers/identity");
const {
  listAllIndentities,
  createIdentity,
  retrieveIdentity,
  updateIdentity,
  deleteIdentity,
  exportIdentity,
} = require("../requests/identity");

const getIdentitySelection = async (token) => {
  const { identitySelection } = await inquirer.prompt([
    {
      type: "list",
      name: "identitySelection",
      message: "Select the request to perform",
      choices: [
        "List all identities (GET)",
        "Create identity (POST)",
        "Retrieve identity (GET)",
        "Update identity (PATCH)",
        "Delete identity (DELETE)",
        "Export identity (GET)",
      ],
    },
  ]);

  processIdentitySelection(identitySelection, token);
};

const getSelectIdentity = async (identities) => {
  return await inquirer.prompt([
    {
      type: "list",
      name: "identitySelected",
      message: "Select an identity: ",
      choices: identities,
    },
  ]);
};

const getIdentityName = async () => {
  return await inquirer.prompt([
    {
      type: "text",
      name: "name",
      message: "Enter a name for the identity",
    },
  ]);
};

const processIdentitySelection = async (identitySelection, token) => {
  if (identitySelection.includes("List")) {
    await processListIdentities(token);
  }

  if (identitySelection.includes("Create")) {
    await processCreateIdentity(token);
  }

  if (identitySelection.includes("Retrieve")) {
    await processRetrieveIdentity(token);
  }

  if (identitySelection.includes("Update")) {
    await processUpdateIdentity(token);
  }

  if (identitySelection.includes("Delete")) {
    await processDeleteIdentity(token);
  }

  if (identitySelection.includes("Export")) {
    await processExportIdentity(token);
  }
};

const processListIdentities = async (token) => {
  const response = await listAllIndentities(token);

  console.log(response);
};

const processCreateIdentity = async (token) => {
  const { name } = await getIdentityName();

  const response = await createIdentity(token, {
    name,
    protocol: "corda",
    configuration: {
      issuer: "corda-network-uat",
      node_operator_email: "chainstack@example.com",
      legal_name: "OU=Acme,C=SG,L=Singapore,O=Acme",
    },
  });

  console.log(response);
};

const processRetrieveIdentity = async (token) => {
  const identities = await listAllIndentities(token);

  const { identityData, beautified } = extractIdentityData(identities);

  const { identitySelected } = await getSelectIdentity(beautified);
  const identityId = extractIdentityId(identitySelected);

  const response = await retrieveIdentity(token, identityId);
  console.log(response);
};

const processUpdateIdentity = async (token) => {
  const identities = await listAllIndentities(token);

  const { identityData, beautified } = extractIdentityData(identities);

  const { identitySelected } = await getSelectIdentity(beautified);
  const identityId = extractIdentityId(identitySelected);

  const { name } = await getIdentityName();

  const response = await updateIdentity(token, identityId, name);
  console.log(response);
};

const processDeleteIdentity = async (token) => {
  const identities = await listAllIndentities(token);

  const { identityData, beautified } = extractIdentityData(identities);

  const { identitySelected } = await getSelectIdentity(beautified);
  const identityId = extractIdentityId(identitySelected);

  const response = await deleteIdentity(token, identityId);
  console.log(response);
};

const processExportIdentity = async (token) => {
  const identities = await listAllIndentities(token);

  const { identityData, beautified } = extractIdentityData(identities);

  const { identitySelected } = await getSelectIdentity(beautified);
  const identityId = extractIdentityId(identitySelected);

  const response = await exportIdentity(token, identityId);
  console.log(response);
};

module.exports = {
  getIdentitySelection,
};

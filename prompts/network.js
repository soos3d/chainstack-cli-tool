const inquirer = require("inquirer");
const {
  getNetworkConfig,
  extractNetworkData,
  extractNetworkId,
} = require("../helpers/network");
const {
  extractProjectsMetadata,
  extractProjectId,
} = require("../helpers/project");
const {
  listAllNetworks,
  createNetwork,
  retrieveNetwork,
  updateNetwork,
  deleteNetwork,
} = require("../requests/network");
const { listAllProjects } = require("../requests/project");
const {
  buildProviderPrompt,
  buildRegionPrompt,
  buildTypePrompt,
  buildConfigPrompt,
} = require("./node");

const getNetworkSelection = async (token) => {
  const { networkSelection } = await inquirer.prompt([
    {
      type: "list",
      name: "networkSelection",
      message: "Select the request to perform",
      choices: [
        "List all networks (GET)",
        "Create network (POST)",
        "Retrieve network (GET)",
        "Update network (PATCH)",
        "Delete network (DELETE)",
      ],
    },
  ]);

  processNetworkSelection(networkSelection, token);
};

const getProjectSelection = async (metadata) => {
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

const getCreateNetwork = async () => {
  const { protocol, name } = await inquirer.prompt([
    {
      type: "list",
      message: "Select a protocol for the network to be created",
      name: "protocol",
      choices: [
        "fabric",
        "corda",
        "quorum",
        "multichain",
        "ethereum",
        "polygon-pos",
        "bsc",
        "avalanche",
        "fantom",
        "tezos",
        "solana",
        "starknet",
        "bitcoin",
        "harmony",
      ],
    },
    {
      type: "text",
      message: "Enter a name for the network: ",
      name: "name",
    },
  ]);

  return { protocol, name };
};

const getInitialNodes = async (protocol, projectId) => {
  const { name, provider } = await inquirer.prompt([
    {
      type: "text",
      name: "name",
      message: "Please provide a name for the node: ",
    },
    buildProviderPrompt(),
  ]);

  const { region, type, archive, addNew } = await inquirer.prompt([
    buildRegionPrompt(provider),
    buildTypePrompt(protocol),
    buildConfigPrompt(protocol),
    {
      type: "confirm",
      name: "addNew",
      message: "Add another node?",
      default: false,
    },
  ]);

  let configuration = { archive };

  if (protocol === "tezos") {
    configuration.tezos_node_type = "regular";
  }

  return { name, provider, region, type, configuration, addNew };
};

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

const getNetworkName = async () => {
  return await inquirer.prompt([
    {
      type: "text",
      name: "name",
      message: "Please enter a new name for the selected network: ",
    },
  ]);
};

const initNodes = async (protocol, projectId) => {
  let flag = true;
  let nodes = [];

  while (flag) {
    const { name, provider, region, type, configuration, addNew } =
      await getInitialNodes(protocol, projectId);

    nodes.push({
      name,
      type,
      role: "peer",
      provider,
      region,
      configuration,
    });
    flag = addNew;
  }

  return nodes;
};

const processNetworkSelection = async (networkSelection, token) => {
  if (networkSelection.includes("List")) {
    await processListNetworks(token);
  }

  if (networkSelection.includes("Create")) {
    await processCreateNetwork(token);
  }

  if (networkSelection.includes("Retrieve")) {
    await processRetrieveNetwork(token);
  }

  if (networkSelection.includes("Update")) {
    await processUpdateNetwork(token);
  }

  if (networkSelection.includes("Delete")) {
    await processDeleteNetwork(token);
  }
};

const processListNetworks = async (token) => {
  const networks = await listAllNetworks(token);

  console.log("Networks: ", networks);
};

const processCreateNetwork = async (token) => {
  // TODO: GET ALL PROJECTS and show id, name, and creator
  const projects = await listAllProjects(token);
  const { metadata, beautified } = extractProjectsMetadata(projects);

  const projectSelected = await getProjectSelection(beautified);
  const projectId = extractProjectId(projectSelected);

  const { protocol, name } = await getCreateNetwork();

  const configuration = getNetworkConfig(protocol);
  const nodes = await initNodes(protocol, projectId);

  const res = await createNetwork(token, {
    name,
    project: projectId,
    protocol,
    configuration,
    nodes,
  });
  console.log("Network Creation: ", res);
};

const processRetrieveNetwork = async (token) => {
  const networks = await listAllNetworks(token);

  const { networkData, beautified } = extractNetworkData(networks);

  const { networkSelected } = await getSelectNetwork(beautified);
  const networkId = extractNetworkId(networkSelected);

  const response = await retrieveNetwork(token, networkId);
  console.log(response);
};

const processUpdateNetwork = async (token) => {
  const networks = await listAllNetworks(token);

  const { networkData, beautified } = extractNetworkData(networks);

  const { networkSelected } = await getSelectNetwork(beautified);
  const networkId = extractNetworkId(networkSelected);

  const { name } = await getNetworkName();

  const response = await updateNetwork(token, { name }, networkId);
  console.log(response);
};

const processDeleteNetwork = async (token) => {
  const networks = await listAllNetworks(token);

  const { networkData, beautified } = extractNetworkData(networks);

  const { networkSelected } = await getSelectNetwork(beautified);
  const networkId = extractNetworkId(networkSelected);

  const response = await deleteNetwork(token, networkId);
  console.log(response);
};

module.exports = {
  getNetworkSelection,
};

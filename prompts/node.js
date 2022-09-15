const inquirer = require("inquirer");
const {
  extractNetworkData,
  extractNetworkId,
  extractNetworkProtocol,
} = require("../helpers/network");
const { extractNodeData, extractNodeId } = require("../helpers/node");
const { listAllNetworks } = require("../requests/network");
const {
  listAllNodes,
  createNode,
  retrieveNode,
  updateNode,
  deleteNode,
} = require("../requests/node");
const { getSelectNetwork } = require("./common");

const SHARED_NETWORKS = [
  "ethereum",
  "polygon-pos",
  "bsc",
  "avalanche",
  "fantom",
  "tezos",
  "bitcoin",
];

const ARCHIVE_NETWORKS = [
  "ethereum",
  "polygon-pos",
  "bsc",
  "avalanche",
  "fantom",
  "tezos",
  "bitcoin",
];

const getNodeSelection = async (token) => {
  const { nodeSelection } = await inquirer.prompt([
    {
      type: "list",
      name: "nodeSelection",
      message: "Select the request to perform",
      choices: [
        "List all Nodes (GET)",
        "Create Node (POST)",
        "Retrieve Node (GET)",
        "Update Node (PATCH)",
        "Delete Node (DELETE)",
      ],
    },
  ]);

  processNodeSelection(nodeSelection, token);
};

const processNodeSelection = async (nodeSelection, token) => {
  if (nodeSelection.includes("List")) {
    await processListNodes(token);
  }

  if (nodeSelection.includes("Create")) {
    await processCreateNode(token);
  }

  if (nodeSelection.includes("Retrieve")) {
    await processRetrieveNode(token);
  }

  if (nodeSelection.includes("Update")) {
    await processUpdateNode(token);
  }

  if (nodeSelection.includes("Delete")) {
    await processDeleteNode(token);
  }
};

const buildTypePrompt = (protocol) => {
  choices = ["dedicated"];
  if (SHARED_NETWORKS.includes(protocol)) {
    choices.push("shared");
  }

  return {
    type: "list",
    name: "type",
    message: "Select a node type",
    choices,
  };
};

const buildRegionPrompt = (providerType) => {
  let choices;
  if (providerType === "aws") {
    choices = ["ap-southeast-1", "us-west-2", "us-east-1"];
  } else if (providerType === "azure") {
    choices = ["uksouth"];
  } else if (providerType === "gcloud") {
    choices = ["asia-southeast1"];
  } else {
    choices = ["eu1"]; //vzo
  }

  return {
    type: "list",
    name: "region",
    message: `Select a region for the selected provider (${providerType})`,
    choices,
  };
};

const buildProviderPrompt = () => {
  return {
    type: "list",
    name: "provider",
    message: "Please select a provider to host the node",
    choices: ["aws", "azure", "gcloud", "vzo"],
  };
};

const buildConfigPrompt = (protocol) => {
  if (ARCHIVE_NETWORKS.includes(protocol)) {
    return {
      type: "confirm",
      name: "archive",
      message: "Will this be an archive node?",
    };
  }
};

const buildNamePrompt = () => {
  return {
    type: "text",
    name: "name",
    message: "Please provide a name for the node: ",
  };
};

const getCreateNode = async (protocol) => {
  const { name, provider } = await inquirer.prompt([
    buildNamePrompt(),
    buildProviderPrompt(),
  ]);

  const { region, type, archive } = await inquirer.prompt([
    buildRegionPrompt(provider),
    buildTypePrompt(protocol),
    buildConfigPrompt(protocol),
  ]);

  return { name, provider, region, type, configuration: { archive } };
};

const getSelectNode = async (nodes) => {
  return await inquirer.prompt([
    {
      type: "list",
      name: "nodeSelected",
      message: "Select a node: ",
      choices: nodes,
    },
  ]);
};

const getNodeName = async () => {
  return await inquirer.prompt([buildNamePrompt()]);
};

const processListNodes = async (token) => {
  const nodes = await listAllNodes(token);

  console.log("Nodes: ", nodes);
};

const processCreateNode = async (token) => {
  const networks = await listAllNetworks(token);

  const { networkData, beautified } = extractNetworkData(networks);

  // select a network to create the node in
  const { networkSelected } = await getSelectNetwork(beautified);

  const protocol = extractNetworkProtocol(networkData, networkSelected);

  const networkId = extractNetworkId(networkSelected);

  // get node creation options
  const { name, provider, region, type, configuration } = await getCreateNode(
    protocol
  );

  const response = await createNode(
    {
      name,
      network: networkId,
      provider,
      region,
      type,
      role: "peer",
      configuration,
    },
    token
  );

  console.log("Node creation: ", response);
};

const processRetrieveNode = async (token) => {
  const nodes = await listAllNodes(token);

  const { nodeData, beautified } = extractNodeData(nodes);

  const { nodeSelected } = await getSelectNode(beautified);
  const nodeId = extractNodeId(nodeSelected);

  const response = await retrieveNode(nodeId, token);
  console.log(response);
};

const processUpdateNode = async (token) => {
  const nodes = await listAllNodes(token);

  const { nodeData, beautified } = extractNodeData(nodes);

  const { nodeSelected } = await getSelectNode(beautified);
  const nodeId = extractNodeId(nodeSelected);

  const { name } = await getNodeName();

  const response = await updateNode(name, nodeId, token);
  console.log(response);
};

const processDeleteNode = async (token) => {
  const nodes = await listAllNodes(token);

  const { nodeData, beautified } = extractNodeData(nodes);

  const { nodeSelected } = await getSelectNode(beautified);
  const nodeId = extractNodeId(nodeSelected);

  const response = await deleteNode(nodeId, token);
  response && console.log(response);
};

module.exports = {
  getNodeSelection,
  buildRegionPrompt,
  buildTypePrompt,
  buildProviderPrompt,
  buildConfigPrompt,
  buildNamePrompt,
};

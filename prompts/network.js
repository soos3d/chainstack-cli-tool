const inquirer = require("inquirer");
const { getNetworkConfig } = require("../helpers/network");
const {
  extractProjectsMetadata,
  extractProjectId,
} = require("../helpers/project");
const { listAllNetworks, createNetwork } = require("../requests/network");
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
      choices: ["List all networks (GET)", "Create network (POST)"],
    },
  ]);

  processNetworkSelection(networkSelection, token);
};

const getProjectSelection = async (metadata) => {
  const { projectSelection } = await inquirer.prompt([
    {
      type: "list",
      message: "Select a project to create the network on",
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
      message: "Enter a name for the network",
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
      message: "Please provide a name for the node",
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
};

const processListNetworks = async (token) => {
  const networks = await listAllNetworks(token);

  console.log("Networks: ", networks);
};

const processCreateNetwork = async (token) => {
  // TODO: GET ALL PROJECTS and show id, name, and creator
  const projects = await listAllProjects(token);
  const metadata = extractProjectsMetadata(projects);

  console.log(metadata);

  const projectSelected = await getProjectSelection(metadata);
  const projectId = extractProjectId(projectSelected, metadata);

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

module.exports = {
  getNetworkSelection,
};

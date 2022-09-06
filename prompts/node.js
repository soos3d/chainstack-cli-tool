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

module.exports = {
  buildRegionPrompt,
  buildTypePrompt,
  buildProviderPrompt,
  buildConfigPrompt,
};

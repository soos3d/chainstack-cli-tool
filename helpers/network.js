const getNetworkConfig = (protocol) => {
  if (protocol === "fabric") {
    return { consensus: "raft" };
  } else if (protocol === "corda") {
    return { consensus: "single-notary" };
  } else if (protocol === "quorum") {
    return { consensus: "ibift" };
  } else if (protocol === "multichain") {
    return { consensus: "round-robin" };
  } else {
    return { network: `${protocol}-mainnet` };
  }
};

const extractNetworkData = ({ results }) => {
  const networkData = [];
  const beautified = [];

  results.forEach((network, index) => {
    networkData.push({ index, id: network.id, name: network.name });
    beautified.push(
      `${network.id}|${network.name} (${network.protocol})|By: ${
        network.creator && network.creator.email
      }`
    );
  });

  return { networkData, beautified };
};

const extractNetworkId = (networkSelected) => {
  return networkSelected.split("|")[0];
};

module.exports = {
  getNetworkConfig,
  extractNetworkData,
  extractNetworkId,
};

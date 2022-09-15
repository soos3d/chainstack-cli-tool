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
    networkData.push({
      index,
      id: network.id,
      name: network.name,
      protocol: network.protocol,
    });
    beautified.push(
      `[${index}]|${network.id}|${network.name} (${network.protocol})|By: ${
        network.creator && network.creator.email
      }`
    );
  });

  return { networkData, beautified };
};

const extractNetworkProtocol = (networkData, networkSelected) => {
  const pos = networkSelected.split("|")[0];
  const index = pos.substring(1, pos.length - 1);

  return networkData[index].protocol;
};

const extractNetworkId = (networkSelected) => {
  return networkSelected.split("|")[1];
};

module.exports = {
  getNetworkConfig,
  extractNetworkData,
  extractNetworkId,
  extractNetworkProtocol,
};

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

module.exports = {
  getNetworkConfig,
};

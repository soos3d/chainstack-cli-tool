const extractNodeData = ({ results }) => {
  const nodeData = [];
  const beautified = [];

  results.forEach((node, index) => {
    nodeData.push({
      index,
      id: node.id,
      name: node.name,
      network: node.network,
    });
    beautified.push(
      `[${index}]|${node.id}|${node.name}|By: ${
        node.creator && node.creator.email
      }`
    );
  });

  return { nodeData, beautified };
};

const extractNodeId = (nodeSelected) => {
  return nodeSelected.split("|")[1];
};

module.exports = {
  extractNodeData,
  extractNodeId,
};

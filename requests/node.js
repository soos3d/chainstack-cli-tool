const { fetchWithToken } = require("./fetch");

const listAllNodes = async (token) => {
  const response = await fetchWithToken("nodes", "", token);

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const createNode = async (data, token) => {
  const response = await fetchWithToken("nodes", data, token, "post");

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const retrieveNode = async (nodeId, token) => {
  const response = await fetchWithToken(`nodes/${nodeId}`, "", token);

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const updateNode = async (name, nodeId, token) => {
  const response = await fetchWithToken(
    `nodes/${nodeId}`,
    { name },
    token,
    "patch"
  );

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const deleteNode = async (nodeId, token) => {
  const response = await fetchWithToken(`nodes/${nodeId}`, "", token, "delete");

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

module.exports = {
  listAllNodes,
  createNode,
  retrieveNode,
  updateNode,
  deleteNode,
};

const { fetchWithToken } = require("./fetch");

const listAllNetworks = async (token) => {
  const response = await fetchWithToken("networks", "", token);

  if (response) {
    return response.data;
  }

  return null;
};

const createNetwork = async (token, data) => {
  const response = await fetchWithToken("networks", data, token, "post");
  //console.log(data);

  if (response) {
    return response.data;
  }

  return null;
};

const retrieveNetwork = async (token, networkId) => {
  const response = await fetchWithToken(`networks/${networkId}`, "", token);

  if (response) {
    return response.data;
  }

  return null;
};

const updateNetwork = async (token, data, networkId) => {
  const response = await fetchWithToken(
    `networks/${projectId}`,
    data,
    token,
    "patch"
  );

  if (response) {
    return response.data;
  }

  return null;
};

const deleteNetwork = async (token, networkId) => {
  const response = await fetchWithToken(
    `networks/${networkId}`,
    "",
    token,
    "delete"
  );

  if (response) {
    return response.data;
  }

  return null;
};

module.exports = {
  listAllNetworks,
  createNetwork,
  retrieveNetwork,
  updateNetwork,
  deleteNetwork,
};

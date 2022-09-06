const { fetchWithToken } = require("./fetch");

const listAllNetworks = async (token) => {
  const response = await fetchWithToken("networks", "", token);

  if (response) {
    return response.data;
  }

  return null;
};

const createNetwork = async (token, data) => {
  console.log(data);
  const response = await fetchWithToken("networks", data, token, "post");

  if (response) {
    return response.data;
  }

  return null;
};

module.exports = {
  listAllNetworks,
  createNetwork,
};

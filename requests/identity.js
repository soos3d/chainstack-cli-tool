const { fetchWithToken } = require("./fetch");

const listAllIndentities = async (token) => {
  const response = await fetchWithToken("identities", "", token);

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const createIdentity = async (token, params) => {
  const response = await fetchWithToken("identities", params, token, "post");

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const retrieveIdentity = async (token, id) => {
  const response = await fetchWithToken(`identities/${id}`, "", token);

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const updateIdentity = async (token, id, name) => {
  const response = await fetchWithToken(
    `identities/${id}`,
    { name },
    token,
    "patch"
  );

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const deleteIdentity = async (token, id) => {
  const response = await fetchWithToken(
    `identities/${id}`,
    "",
    token,
    "delete"
  );

  if (response) {
    return response.status === 204
      ? `Project ${id} deleted`
      : `${response.status}: ${response.statusText}`;
  }

  return null;
};

const exportIdentity = async (token, id) => {
  const response = await fetchWithToken(`identities/${id}/export`, "", token);

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

module.exports = {
  listAllIndentities,
  createIdentity,
  retrieveIdentity,
  updateIdentity,
  deleteIdentity,
  exportIdentity,
};

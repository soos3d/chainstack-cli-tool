const { fetchWithToken } = require("./fetch");

const getOrganization = async (token) => {
  const response = await fetchWithToken("organization", "", token);

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const updateOrganization = async (name, token) => {
  const response = await fetchWithToken(
    "organization",
    { name },
    token,
    "patch"
  );

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

module.exports = {
  getOrganization,
  updateOrganization,
};

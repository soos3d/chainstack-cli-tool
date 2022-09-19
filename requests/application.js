const { fetchWithToken } = require("./fetch");

const listAllApplications = async (token) => {
  const response = await fetchWithToken("applications", "", token);

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const createApplication = async (token, data) => {
  const response = await fetchWithToken("applications", data, token, "post");

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const retrieveApplication = async (token, applicationId) => {
  const response = await fetchWithToken(
    `applications/${applicationId}`,
    "",
    token
  );

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const deleteApplication = async (token, applicationId) => {
  const response = await fetchWithToken(
    `applications/${applicationId}`,
    "",
    token,
    "delete"
  );

  if (response) {
    return response.status === 204
      ? `Application ${id} deleted`
      : `${response.status}: ${response.statusText}`;
  }

  return null;
};

module.exports = {
  listAllApplications,
  createApplication,
  retrieveApplication,
  deleteApplication,
};

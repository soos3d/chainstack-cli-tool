const { fetchWithToken } = require("./fetch");

const listAllProjects = async (token) => {
  const response = await fetchWithToken("projects", "", token);

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const createProject = async (token, data) => {
  const response = await fetchWithToken("projects", data, token, "post");

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

module.exports = { listAllProjects };

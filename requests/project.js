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

const retrieveProject = async (token, id) => {
  const response = await fetchWithToken(`projects/${id}`, "", token);

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const updateProject = async (token, id, { name, description }) => {
  const response = await fetchWithToken(`projects/${id}`, "", token);

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

const deleteProject = async (token, id) => {
  const response = await fetchWithToken(`projects/${id}`, "", token, "delete");

  if (response) {
    return response.status === 204
      ? `Project ${id} deleted`
      : `${response.status}: ${response.statusText}`;
  }

  return null;
};

const retrieveProjectMembers = async (token, id) => {
  const response = await fetchWithToken(`projects/${id}/members`, "", token);

  if (response) {
    return response.data ? response.data : response;
  }

  return null;
};

module.exports = {
  listAllProjects,
  createProject,
  retrieveProject,
  updateProject,
  deleteProject,
  retrieveProjectMembers,
};

const inquirer = require("inquirer");
const {
  extractProjectsMetadata,
  extractProjectId,
} = require("../helpers/project");
const {
  listAllProjects,
  retrieveProject,
  createProject,
  updateProject,
  deleteProject,
  retrieveProjectMembers,
} = require("../requests/project");
const { getSelectProject } = require("./common");

const getProjectSelection = async (token) => {
  const { projectSelection } = await inquirer.prompt([
    {
      type: "list",
      name: "projectSelection",
      message: "Select the request to perform",
      choices: [
        "List all projects (GET)",
        "Create project (POST)",
        "Retrieve project (GET)",
        "Update project (PATCH)",
        "Delete project (DELETE)",
        "Retrieve project members (GET)",
      ],
    },
  ]);

  processNetworkSelection(projectSelection, token);
};

const buildNamePrompt = () => {
  return { type: "text", name: "name", message: "Enter project's name: " };
};

const buildDescriptionPrompt = () => {
  return {
    type: "text",
    name: "description",
    message: "Enter project's description: ",
  };
};

const getCreateProject = async () => {
  return await inquirer.prompt([
    buildNamePrompt(),
    buildDescriptionPrompt(),
    {
      type: "list",
      name: "type",
      message: "Select the type of project: ",
      choices: ["consortium", "public"],
      default: "consortium",
    },
  ]);
};

const getUpdateProject = async () => {
  return await inquirer.prompt([buildNamePrompt(), buildDescriptionPrompt()]);
};

const processNetworkSelection = async (projectSelection, token) => {
  if (projectSelection.includes("List")) {
    await processListProjects(token);
  }

  if (projectSelection.includes("Create")) {
    await processCreateProject(token);
  }

  if (
    projectSelection.includes("Retrieve") &&
    !projectSelection.includes("members")
  ) {
    await processRetrieveProject(token);
  }

  if (projectSelection.includes("Update")) {
    await processUpdateProject(token);
  }

  if (projectSelection.includes("Delete")) {
    await processDeleteProject(token);
  }

  if (
    projectSelection.includes("Retrieve") &&
    projectSelection.includes("members")
  ) {
    await processRetrieveProjectMembers(token);
  }
};

const processListProjects = async (token) => {
  const projects = await listAllProjects(token);

  console.log("Projects: ", projects);
};

const processCreateProject = async (token) => {
  const { name, description, type } = await getCreateProject();

  const response = await createProject(token, { name, description, type });

  console.log("Project created: ", response);
};

const processRetrieveProject = async (token) => {
  const projects = await listAllProjects(token);

  const { metadata, beautified } = extractProjectsMetadata(projects);

  const projectSelected = await getSelectProject(beautified);
  const projectId = extractProjectId(projectSelected);

  const response = await retrieveProject(token, projectId);
  console.log(response);
};

const processUpdateProject = async (token) => {
  const projects = await listAllProjects(token);

  const { metadata, beautified } = extractProjectsMetadata(projects);

  const projectSelected = await getSelectProject(beautified);
  const projectId = extractProjectId(projectSelected);

  const data = await getUpdateProject();

  const response = await updateProject(token, projectId, data);
  console.log(response);
};

const processDeleteProject = async (token) => {
  const projects = await listAllProjects(token);

  const { metadata, beautified } = extractProjectsMetadata(projects);

  const projectSelected = await getSelectProject(beautified);
  const projectId = extractProjectId(projectSelected);

  const response = await deleteProject(token, projectId);
  console.log(response);
};

const processRetrieveProjectMembers = async (token) => {
  const projects = await listAllProjects(token);

  const { metadata, beautified } = extractProjectsMetadata(projects);

  const projectSelected = await getSelectProject(beautified);
  const projectId = extractProjectId(projectSelected);

  const response = await retrieveProjectMembers(token, projectId);
  console.log(response);
};

module.exports = {
  getProjectSelection,
};

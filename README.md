# CHAINSTACK CLI TOOL

A tool written in javascript for interacting with [Chainstack's api](https://docs.chainstack.com/api/reference/) from the command line interface.

The following requests are supported and available from the cli. Click on it to watch an example on how to perform it through the cli-tool.

- Perform all organization requests:

  - Get organization name and id
  - Update organization name

- Perform application requests:

  - List all applications
  - Create application
  - Retrieve application
  - Delete application

- Perform all project requests:

  - List all projects
  - Create Project
  - Retrieve Project
  - Update Project (only on consortium projects)
  - Delete Project
  - Retrieve project members

- Perform all network requests:

  - List all networks
  - [Create Network (only shared nodes)](examples/create-network/README.md)
  - Retrieve Network
  - Update Network (only on consortium projects)
  - Delete Network

- Perform all node requests:

  - List all nodes
  - Create Nodes (only shared nodes)
  - Retrieve Nodes
  - Update Nodes
  - Delete Nodes

- Perform all identity requests:

  - List all Identities
  - Create Identities
  - Retrieve Identities
  - Update Identities
  - Delete Identities
    -Export Identities

Requirements:

- An api key from Chainstack. [Get your api key](https://docs.chainstack.com/platform/create-an-api-key).

Instructions:

```
git clone https://github.com/yieniggu/chainstack-cli-tool
cd chainstack-cli-tool
npm install
node index
```

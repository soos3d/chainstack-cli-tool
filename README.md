# CHAINSTACK CLI TOOL

A tool written in javascript for interacting with [Chainstack's api](https://docs.chainstack.com/api/reference/) from the command line interface.

Currently allow to:

- Perform all network requests:

  - List all networks
  - Create Network (only shared nodes)
  - Retrieve Network
  - Update Network (only on consortium projects)
  - Delete Network

- Perform all node requests:
  - List all nodes
  - Create Nodes (only shared nodes)
  - Retrieve Nodes
  - Update Nodes (only on consortium projects)
  - Delete Nodes

Requirements:

- An api key from Chainstack. [Get your api key](https://docs.chainstack.com/platform/create-an-api-key).

Instructions:

```
git clone https://github.com/yieniggu/chainstack-cli-tool
cd chainstack-cli-tool
npm install
node index
```

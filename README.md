<img width="1200" alt="Labs" src="https://user-images.githubusercontent.com/99700157/213291931-5a822628-5b8a-4768-980d-65f324985d32.png">

<p>
 <h3 align="center">Chainstack is the leading suite of services connecting developers with Web3 infrastructure</h3>
</p>

<p align="center">
  <a target="_blank" href="https://chainstack.com/build-better-with-ethereum/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Ethereum.svg" /></a>&nbsp;  
  <a target="_blank" href="https://chainstack.com/build-better-with-bnb-smart-chain/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/BNB.svg" /></a>&nbsp;
  <a target="_blank" href="https://chainstack.com/build-better-with-polygon/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Polygon.svg" /></a>&nbsp;
  <a target="_blank" href="https://chainstack.com/build-better-with-avalanche/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Avalanche.svg" /></a>&nbsp;
  <a target="_blank" href="https://chainstack.com/build-better-with-fantom/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Fantom.svg" /></a>&nbsp;
</p>

<p align="center">
  • <a target="_blank" href="https://chainstack.com/">Homepage</a> •
  <a target="_blank" href="https://chainstack.com/protocols/">Supported protocols</a> •
  <a target="_blank" href="https://chainstack.com/blog/">Chainstack blog</a> •
  <a target="_blank" href="https://docs.chainstack.com/quickstart/">Chainstack docs</a> •
  <a target="_blank" href="https://docs.chainstack.com/quickstart/">Blockchain API reference</a> •
  <a target="_blank" href="https://console.chainstack.com/user/account/create">Start for free</a> •
</p>

# Chainstack's CLI-tool

A tool written in javascript for interacting with [Chainstack's api](https://docs.chainstack.com/api/reference/) from the command line interface.

Requirements:

- An api key from Chainstack. [Get your api key](https://docs.chainstack.com/platform/create-an-api-key).

Instructions:

```
git clone https://github.com/yieniggu/chainstack-cli-tool
cd chainstack-cli-tool
npm install
node index
```

---

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
  - [Create Project](examples/create-project/README.md)
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
  - [Create Nodes (only shared nodes)](examples/create-node/README.md)
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

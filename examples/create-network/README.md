# Creating a new Ethereum network

---

Lets say we want to create a new Ethereum network, initially with a full node. First, in the project's root folder, open a terminal and run:

```
node index
```

A new input will be prompted asking for your Chainstack's api key. You can get yours from [Chainstack console](https://console.chainstack.com/user/settings/api-keys).

![001](../api-key.png)

After that, you can get to choose any of the requests specified in the [api reference documentation](https://docs.chainstack.com/api/reference/):

![002](assets/002.png)

Select **Network Requests**, then **Create Network**.

![003](assets/003.png)

If we check the documentation reference for [creating a network](https://docs.chainstack.com/api/reference/#operation/createNetwork), it requires a few parameters in JSON format. Paramaters differs on some networks, but for **EVM based** networks (like Ethereum) they are pretty much the same:

![004](assets/004.png)

Now, you will be prompted to select all of this parameters as inputs to succesfully create a new ethereum network. First, a **project is needed**, since a project ID is required as param. Projects list will vary depending on the organization you are in, so be sure to **create a new project before creating networks**.

![005](assets/005.png)

Then, you need to choose **which protocol** will be used for the network, in this example we'll use ethereum.

![006](assets/006.png)

Next, we need to input a name. For evm based networks, it will set the network type as name by default.

![007](assets/007.png)

After that, it's required to pass a list of initial nodes. In this example we will create just one full node, but you can try creating a few more if needed. First a name is required for the node:

![008](assets/008.png)

Then, a provider and a region from the provider is required. Regions will vary depending on the provider you choose. Please refer to the [creating nodes reference](https://docs.chainstack.com/api/reference/#operation/createNode) for further details. In this case, we'll select aws from the provider list, and us-east-1 as region.

![009](assets/009.png)

![010](assets/010.png)

Now we need to choose the type of node to create. Currently, **only shared nodes are supported**.

![011](assets/011.png)

Finally we need to set if the node will be in archive mode. In this example **we'll select NO**, as we are creating a full node.

![012](assets/012.png)

We'll be asked if we want to add another node. In this example we will create just one for simplicity, but you can try adding more nodes if you wish:

![013](assets/013.png)

And thats it! If everything goes well, you shall see this kind of output from the terminal.

![014](assets/014.png)

Now if we go to the [Chainstack's console](https://console.chainstack.com/) we can look for our network and it's initial full node.

![015](assets/015.png)

![016](assets/016.png)

![017](assets/017.png)


const ethers = require("ethers");
const fs = require("fs-extra")

async function main() {
    console.log();
    // http://127.0.0.1:7545 ganache
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');
    const wallet = new ethers.Wallet("0xfc09f46cf584281c0aa2486e9e3f6eed89b3e95af8abcbbacdbd9f7d50c1c9b1",
        provider
    )
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf8");
    const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
    console.log("Deploying...");
    const contract = await contractFactory.deploy();
    const deployingReceipt = await contract.deploymentTransaction
    console.log(deployingReceipt);

}

main().then(
    () => process.exit(0)).catch((error) => {
        console.error(error);
        process.exit(1)
    })

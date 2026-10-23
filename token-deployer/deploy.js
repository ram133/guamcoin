import { ethers } from "ethers";
import fs from "fs";

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const signer = await provider.getSigner();

    const artifact = JSON.parse(fs.readFileSync("./artifacts/contracts/MyToken.sol/FactCoin.json", "utf8"));
    
    console.log("Deploying Fact Coin...");
    const Factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
    const factCoin = await Factory.deploy();
    await factCoin.waitForDeployment();
    
    console.log(`Fact Coin deployed to: ${await factCoin.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

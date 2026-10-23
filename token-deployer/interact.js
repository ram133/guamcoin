import { ethers } from "ethers";
import fs from "fs";

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const signer = await provider.getSigner();

    const artifact = JSON.parse(fs.readFileSync("./artifacts/contracts/MyToken.sol/FactCoin.json", "utf8"));
    const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    
    const factCoin = new ethers.Contract(contractAddress, artifact.abi, signer);

    const name = await factCoin.name();
    const symbol = await factCoin.symbol();
    const balance = await factCoin.balanceOf(await signer.getAddress());
    const decimals = await factCoin.decimals();

    console.log(`Token Name: ${name} (${symbol})`);
    console.log(`Deployer Balance: ${ethers.formatUnits(balance, decimals)} ${symbol}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const artifact = JSON.parse(fs.readFileSync("./artifacts/contracts/MyToken.sol/FactCoin.json", "utf8"));
    const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

    const factCoin = new ethers.Contract(contractAddress, artifact.abi, wallet);

    const name = await factCoin.name();
    const symbol = await factCoin.symbol();
    const balance = await factCoin.balanceOf(wallet.address);
    const decimals = await factCoin.decimals();

    console.log(`Connected Wallet: ${wallet.address}`);
    console.log(`Token Name: ${name} (${symbol})`);
    console.log(`Deployer Balance: ${ethers.formatUnits(balance, decimals)} ${symbol}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

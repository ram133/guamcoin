import { ethers } from "ethers";
import fs from "fs";

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const signer = await provider.getSigner();

    const recipient = process.argv[2] || "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"; // Default to Account #1
    const amount = process.argv[3] || "1000"; // Default to 1,000 FACT

    const artifact = JSON.parse(fs.readFileSync("./artifacts/contracts/MyToken.sol/FactCoin.json", "utf8"));
    const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    
    const factCoin = new ethers.Contract(contractAddress, artifact.abi, signer);
    const decimals = await factCoin.decimals();
    const parsedAmount = ethers.parseUnits(amount, decimals);

    console.log(`Transferring ${amount} FACT to ${recipient}...`);
    const tx = await factCoin.transfer(recipient, parsedAmount);
    await tx.wait();

    const recipientBalance = await factCoin.balanceOf(recipient);
    console.log(`Success! Recipient Balance: ${ethers.formatUnits(recipientBalance, decimals)} FACT`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

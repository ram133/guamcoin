import hre from "hardhat";

async function main() {
    const FactCoin = await hre.ethers.getContractFactory("FactCoin");
    console.log("Deploying Fact Coin to Sepolia...");
    const factCoin = await FactCoin.deploy();
    await factCoin.waitForDeployment();
    
    const address = await factCoin.getAddress();
    console.log(`Fact Coin successfully deployed live to Sepolia at: ${address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

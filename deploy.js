const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()
async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    //"http://127.0.0.1:8545"
    //const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")
    //let wallet = new ethers.Wallet.fromEncryptedJson(process.env.PRIVATE_KEY_PASSWORD)
    //wallet = await wallet.connect(provider);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8",
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)
    console.log(`Contract Adress: ${contract.address}`)
    const currentFavoriteNumber = await contract.retreive()
    console.log(`Current Favorite Number : ${currentFavoriteNumber.toString()}`)
    const transactionResponse = await contract.store("7")
    const transactonReceipt = await transactionResponse.wait(1)
    const updatedFavoriteNumber = await contract.retreive()
    console.log(`Updated Favorite Number : ${updatedFavoriteNumber.toString()}`)
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

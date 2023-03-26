
const contractAddress = "0x3Fd147B6E483f97f8f1B975B6b490D718636E9a1";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "enum RPS.Choice",
				"name": "_choice",
				"type": "uint8"
			}
		],
		"name": "play",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "gameHistory",
		"outputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"internalType": "enum RPS.Choice",
				"name": "choice",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getGameCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');

// для локального ганаш
// const provider = new ethers.providers.Web3Provider(window.ethereum);

let signer;
let contractInstance;

async function init() {
  await window.ethereum.enable();
  signer = provider.getSigner();
  contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
}


async function playGame(choice) {
  try {
    // Enable Metamask
    await window.ethereum.enable();

    const signer = provider.getSigner();

    const rpsContract = new ethers.Contract(contractAddress, contractABI, signer);

    // Call smart contract's `play` function
    const txResponse = await rpsContract.play(choice);

    console.log(`Transaction hash: ${txResponse.hash}`);

  } catch (error) {
      console.error(error);
  }
}

async function getGameCount() {
  try {
     // Enable Metamask
     await window.ethereum.enable();

     const rpsContract = new ethers.Contract(contractAddress, contractABI, provider);

     // Call smartcontract's `getGameCount` view function.
     const count = await rpsContract.getGameCount();

     console.log(`Number of games played: ${count.toNumber()}`);

   } catch (error) {
       console.error(error);
   }
}

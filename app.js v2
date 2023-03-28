const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

const contractAddress = "0x3Fd147B6E483f97f8f1B975B6b490D718636E9a1";

const abi = [
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

const contract = new ethers.Contract(contractAddress, abi, provider);
const signer = provider.getSigner();

async function play(choice) {
    const playTx = await contract.connect(signer).play(choice);
    await playTx.wait();
    updateGameHistory();
}

async function updateGameHistory() {
    const gameCount = await contract.getGameCount();
    let history = "<h2>Game History:</h2>";
    for (let i = 0; i < gameCount; i++) {
        const game = await contract.gameHistory(i);
        history += `<p>Player: ${game.player} | Choice: ${game.choice} | Timestamp: ${game.timestamp}</p>`;
    }
    document.getElementById("gameHistory").innerHTML = history;
}

updateGameHistory();

async function init() {
	await window.ethereum.enable();
	signer = provider.getSigner();
	contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
}

async function play(choice) {
    const playTx = await contract.connect(signer).play(choice);
    await playTx.wait();
    updateGameHistory();
}

async function updateGameHistory() {
    const gameCount = await contract.getGameCount();
    let history = "<h2>Game History:</h2>";
    for (let i = 0; i < gameCount; i++) {
        const game = await contract.gameHistory(i);
        history += `<p>Player: ${game.player} | Choice: ${game.choice} | Timestamp: ${game.timestamp}</p>`;
    }

	document.getElementById("gameHistory").innerHTML = history;
}

init();

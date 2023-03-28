// const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

const CONTRACT_ADDRESS = "0x0741695AdF2a6585710Bc696C35138a32B099adE";

// const signer = provider.getSigner();

const ABI = [
	{
		"inputs": [
			{
				"internalType": "enum ananasRockPaperScissors.Move",
				"name": "playerMove",
				"type": "uint8"
			}
		],
		"name": "play",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getGameHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "enum ananasRockPaperScissors.Move",
						"name": "playerMove",
						"type": "uint8"
					},
					{
						"internalType": "enum ananasRockPaperScissors.Move",
						"name": "computerMove",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "result",
						"type": "string"
					}
				],
				"internalType": "struct ananasRockPaperScissors.Game[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
let provider;
let signer;
let contract;

async function initialize() {
    if (typeof window.ethereum !== 'undefined') {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        displayGameHistory();
    } else {
        alert('Please install MetaMask to use this dApp!');
    }
}

async function play(move) {
    try {
        const tx = await contract.play(move);
        await tx.wait();
        displayGameHistory();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function displayGameHistory() {
    const gameHistory = await contract.getGameHistory();
    const gameHistoryList = document.getElementById('game-history');
    gameHistoryList.innerHTML = '';

    gameHistory.forEach((game, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Game ${index + 1}: You played ${moveToString(game.playerMove)}, computer played ${moveToString(game.computerMove)}. Result: ${game.result}`;
        gameHistoryList.appendChild(listItem);
    });
}

function moveToString(move) {
    switch (move) {
        case 0: return 'Rock';
        case 1: return 'Paper';
        case 2: return 'Scissors';
    }
}
async function init() {
	await window.ethereum.enable();
	signer1 = provider.getSigner();
	contractInstance = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}


init();
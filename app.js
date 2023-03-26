const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');

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

const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());

async function playGame() {
  const choice = document.getElementById('choice').value;
  await contract.play(choice);
  updateGameHistory();
}

async function updateGameHistory() {
  const gameCount = await contract.getGameCount();
  const gameHistoryElement = document.getElementById('game-history');
  gameHistoryElement.innerHTML = '';
  for (let i = 0; i < gameCount; i++) {
    const game = await contract.gameHistory(i);
    const player = game.player;
    const choice = getChoiceName(game.choice);
    const timestamp = new Date(game.timestamp * 1000).toLocaleString();
    const gameElement = document.createElement('div');
    gameElement.innerText = `${player} chose ${choice} at ${timestamp}`;
    gameHistoryElement.appendChild(gameElement);
  }
}

function getChoiceName(choice) {
  if (choice == 0) {
    return 'Rock';
  } else if (choice == 1) {
    return 'Paper';
  } else if (choice == 2) {
    return 'Scissors';
  }
}


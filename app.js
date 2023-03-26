// Подключение Web3.js
const Web3 = require('web3');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/'); // BSC Testnet


// Адрес и ABI смарт-контракта
const contractAddress = '0x17ca12709620AF33885B28839194a41972f3804D';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_TOKEN",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_NFT",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_NFTBONUSID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_MINBET",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_MAXREWARDMULTIPLIER",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_ORACLE",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_ORACLEFEE",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "maxRewardMultiplier",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minBet",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nft",
		"outputs": [
			{
				"internalType": "contract IERC721",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nftBonusID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "oracle",
		"outputs": [
			{
				"internalType": "contract AggregatorV3Interface",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "oracleFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum RockPaperScissors.Move",
				"name": "move",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "betAmount",
				"type": "uint256"
			}
		],
		"name": "play",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Создание экземпляра контракта
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Обработка нажатия на кнопки
document.getElementById('rock').onclick = () => play(1);
document.getElementById('scissors').onclick = () => play(2);
document.getElementById('paper').onclick = () => play(3);

async function play(choice) {
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];
    await contract.methods.play(choice).send({ from });
}

// Шаг 3: Отображение истории игр

contract.events.GameResult({}, (error, event) => {
    if (error) console.error(error);
    else {
        const result = event.returnValues;
        addToHistory(result);
    }
});

function addToHistory(result) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = `Игрок: ${result.playerChoice}, Компьютер: ${result.computerChoice}, Результат: ${result.result}`;
    historyList.appendChild(listItem);
}
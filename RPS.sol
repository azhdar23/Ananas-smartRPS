pragma solidity ^0.8.0;

contract RPS {
    enum Choice {Rock, Paper, Scissors}
    struct Game {
        address player;
        Choice choice;
        uint256 timestamp;
    }

    Game[] public gameHistory;

    function play(Choice _choice) public {
        gameHistory.push(Game(msg.sender, _choice, block.timestamp));
    }

    function getGameCount() public view returns (uint256) {
        return gameHistory.length;
    }
}
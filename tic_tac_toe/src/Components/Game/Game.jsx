import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	updateField,
	setGameMessage,
	resetGame,
	setIsGameEnded,
	setIsDraw,
	togglePlayer,
} from "../Actions/gameActions";
import Information from "../Information/Information";
import Field from "../Field/Field";

class Game extends Component {
	handleCellClick = (index) => {
		const { isGameEnded, isDraw, field, currentPlayer, updateField } =
			this.props;
		if (!isGameEnded && !isDraw && field[index] === "") {
			const newField = [...field];
			newField[index] = currentPlayer;
			updateField(newField);
			this.checkWinner(newField, currentPlayer);
		}
	};

	handleRestart = () => {
		const { resetGame } = this.props;
		resetGame();
	};

	checkWinner = (currentField, player) => {
		const { setGameMessage, setIsGameEnded, setIsDraw, togglePlayer } =
			this.props;
		const WIN_PATTERNS = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8], // Варианты побед по горизонтали
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8], // Варианты побед по вертикали
			[0, 4, 8],
			[2, 4, 6], // Варианты побед по диагонали
		];

		for (let i = 0; i < WIN_PATTERNS.length; i++) {
			const [a, b, c] = WIN_PATTERNS[i];
			if (
				currentField[a] === player &&
				currentField[b] === player &&
				currentField[c] === player
			) {
				setGameMessage(`Победа: ${player}`);
				setIsGameEnded(true);
				setIsDraw(false);
				return;
			}
		}

		if (!currentField.includes("")) {
			setGameMessage("НИЧЬЯ");
			setIsGameEnded(true);
			setIsDraw(true);
			return;
		}

		const nextPlayer = player === "X" ? "O" : "X";
		togglePlayer();
		setGameMessage(`Ходит: ${nextPlayer}`);
	};

	render() {
		const { field } = this.props;

		return (
			<div className="max-w-md mx-auto my-11 p-4 border-4 border-blue-600 rounded-lg shadow-lg bg-gray-200">
				<Information />
				<Field field={field} handleCellClick={this.handleCellClick} />
				<button
					className="block mx-auto mt-4 px-4 py-2 border-4 border-blue-600 rounded-lg bg-gray-200 hover:bg-gray-300"
					onClick={this.handleRestart}
					type="button"
				>
					Начать заново
				</button>
			</div>
		);
	}
}

Game.propTypes = {
	field: PropTypes.array.isRequired,
	currentPlayer: PropTypes.string.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
	isDraw: PropTypes.bool.isRequired,
	updateField: PropTypes.func.isRequired,
	setGameMessage: PropTypes.func.isRequired,
	resetGame: PropTypes.func.isRequired,
	setIsGameEnded: PropTypes.func.isRequired,
	setIsDraw: PropTypes.func.isRequired,
	togglePlayer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	field: state.field,
	currentPlayer: state.currentPlayer,
	isGameEnded: state.isGameEnded,
	isDraw: state.isDraw,
});

const mapDispatchToProps = {
	updateField,
	setGameMessage,
	resetGame,
	setIsGameEnded,
	setIsDraw,
	togglePlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

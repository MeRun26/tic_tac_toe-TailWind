import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Field extends Component {
	render() {
		const { field, handleCellClick } = this.props;

		return (
			<div className="grid grid-cols-3 grid-rows-3 gap-0 h-96 w-96 mx-auto p-20">
				{field.map((cell, index) => (
					<button
						key={index}
						onClick={() => handleCellClick(index)}
						disabled={cell !== ""}
						className={`text-3xl border border-black cursor-pointer ${
							cell === "X"
								? "text-red-500"
								: cell === "O"
									? "text-blue-500"
									: ""
						}`}
					>
						{cell}
					</button>
				))}
			</div>
		);
	}
}

Field.propTypes = {
	field: PropTypes.array.isRequired,
	handleCellClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	field: state.field,
});

export default connect(mapStateToProps)(Field);

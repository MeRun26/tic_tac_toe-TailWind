import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Information extends Component {
	render() {
		const { message } = this.props;

		return (
			<div className="text-center mb-4">
				<p className="text-xl font-bold text-blue-600">{message}</p>
			</div>
		);
	}
}

Information.propTypes = {
	message: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	message: state.message,
});

export default connect(mapStateToProps)(Information);

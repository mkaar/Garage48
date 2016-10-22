import React, { Component, PropTypes } from 'react';

export default class Root extends Component {

	static propTypes = {
		children: PropTypes.object,
	};

	render() {
		return (
			<div className="Root">
				{this.props.children}
			</div>
		);
	}
}
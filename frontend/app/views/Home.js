import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';

export default class Home extends Component {
	render() {
		return (
			<div className="locata">
				<div className="container">
					<div className="headerLogo">
						<Isvg src="/Locata-logo.svg" />
					</div>
					<div className="text">
						<p>
							Text1
						</p>
						<p>
							Text2
						</p>
						<p>
							Text3
						</p>
					</div>
					<div className="formContent">
						<input className="input" placeholder="Ex. Viru 1 Tallinn" />

					</div>
				</div>
			</div>
		);
	}
}
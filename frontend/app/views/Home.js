import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';

import json from 'json!../../adressJson.json';
import { mapStyles } from '../holdMapStyles';
export default class Home extends Component {

	state = {
		lat: 59.4373,
		lng: 24.7453,
		zoom: 14,
		value: '',
		stage: 0,
		mapLoaded: false,
		name: '',
	};

	listener1 = google.maps.event.addDomListener(window, 'load', this.init.bind(this, this.state));
	listener2 = google.maps.event.addDomListener(window, 'submit', (event) => {
		event.preventDefault();
		//console.log('satte ',this.state);
		this.init.bind(this);
	});

	render() {

		return (
			<div className="locata">
				<div className="container">
					<div className="headerLogo">
						<Isvg src="/Locata-logo.svg" />
					</div>
					<div className={ this.renderClassName() }>
						<form
							className="formContent"
							onSubmit={this.handleSubmit.bind(this, 'Tallinn, Veerenni 2')}
						>
							<input
								className="input"
								placeholder="Insert address here..."
								value={this.state.value}
								onChange={this.handleChange.bind(this)}
							/>
						</form>
						<ul className="autocomplete-results">
							<li onClick={this.handleSubmit.bind(this, 'Tallinn, Veerenni 2')}>Tallinn, Veerenni 2</li>
							<li onClick={this.handleSubmit.bind(this, 'Tallinn, Veerenni 21')}>Tallinn, Veerenni 21</li>
							<li onClick={this.handleSubmit.bind(this, 'Tallinn, Veerenni 22')}>Tallinn, Veerenni 22</li>
							<li onClick={this.handleSubmit.bind(this, 'Tallinn, Veerenni 23')}>Tallinn, Veerenni 23</li>
						</ul>
						<ul className="data-results">
							{/*<li> {this.state.name}</li>*/}
							<li className="p20" >Air quality</li>
							<li className="p40" >Nearest school</li>
							<li className="p70" >Nearest bus stop</li>
							<li className="p60" >Traffic safety</li>
							<li className="p100" >Average wage</li>
						</ul>
						<div className="pointer-tail">
							<Isvg src="/pointer-tail.svg" />
						</div>
					</div>
					<div className="map" id="map" />
				</div>
			</div>
		);
	}

	handleChange(event) {
		if (event.target.value.length > 2) {
			this.setState({ value: event.target.value, stage: 1});
		}else {
			this.setState({ value: event.target.value, stage: 0 });
		}
	}

	handleSubmit(name) {
		//event.preventDefault();
		//console.log(name);
		this.setState({ lat: json.xcord, lng: json.ycord, stage: 2, name: name });

		this.init.bind(this, this.state);
		setTimeout(() => { this.setState({ stage: 3 }) }, 1000);

	}

	renderClassName() {
		const number = this.state.stage;
		switch (number) {
			case 1:
				return 'popup hide autocomplete';
				break;
			case 2:
				return 'popup hide results';
				break;
			case 3:
				return 'popup results';
				break;
			default:
				return 'popup hide input';
				break;
		}
	}

	init() {
		console.log(this.state);
		var mapOptions = {
			zoom: 13,
			disableDefaultUI: true,
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: false,
			scaleControl: false,
			draggable: false,
			disableDoubleClickZoom: true,
			center: new google.maps.LatLng(this.state.lat, this.state.lng),
			styles: mapStyles,
		};
		var mapElement = document.getElementById('map');
		var map = new google.maps.Map(mapElement, mapOptions);
	}
}

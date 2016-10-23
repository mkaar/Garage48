import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';

import { mapStyles } from '../holdMapStyles';
export default class Home extends Component {

	jsonDemo = {
		name: 'Tallinn, Lai 18',
		xcord: '24.7451903462223',
		ycord: '59.438599269995',
		air: 5,
		school: 7,
		kindergarten: 3,
		bus: 8,
		safety: 4,
		wage: 10,
	};

	state = {
		lat: 59.4373,
		lng: 24.7453,
		zoom: 14,
		value: '',
		stage: 0,
		mapLoaded: false,
		json: this.jsonDemo,
	};

	jsonDemo1 = {
		name: 'Tallinn, Viru 5',
		xcord: '24.7477592881868',
		ycord: '59.4369590100527',
		air: 6,
		school: 5,
		kindergarten: 2,
		bus: 7,
		safety: 6,
		wage: 8,
	};

	jsonDemo2 = {
		name: 'Tallinn, Uus 15',
		xcord: '24.7495324263557',
		ycord: '59.4390584767156',
		air: 8,
		school: 2,
		kindergarten: 3,
		bus: 5,
		safety: 8,
		wage: 4,
	};

	jsonDemo3 = {
		name: 'Tallinn, Vabaduse väljak 8',
		xcord: '24.7447273270044',
		ycord: '59.4344985959327',
		air: 8,
		school: 2,
		kindergarten: 3,
		bus: 10,
		safety: 4,
		wage: 10,
	};

	jsonDemo4 = {
		name: 'Tallinn, Vene 37',
		xcord: '24.7484081127545',
		ycord: '59.4398684734993',
		air: 3,
		school: 8,
		kindergarten: 7,
		bus: 9,
		safety: 8,
		wage: 2,
	};

	listener = google.maps.event.addDomListener(window, 'load', this.init.bind(this));
	listener1 = google.maps.event.addDomListener(window, 'submit', (event) => {event.preventDefault()});

	render() {

		return (
			<div className="locata">
				<div className="container">
					<div className="headerLogo">
						<Isvg src="/Locata-logo.svg" />
					</div>
					<p id="wanna-go" onClick={() => {this.setState({ stage: 0, value: '' });}}><a>Wanna go again?</a></p>
					<p className="text">We turn location based data to valuable information for everyone!</p>
					<div className={ this.renderClassName() }>
						<form
							className="formContent"
							onSubmit={this.handleSubmit.bind(this, this.jsonDemo)}
						>
							<input
								className="input"
								placeholder="Insert address here..."
								value={this.state.value}
								onChange={this.handleChange.bind(this)}
								autoFocus
							/>
						</form>
						<ul className="autocomplete-results">
							<li onClick={this.handleSubmit.bind(this, this.jsonDemo)}>{ this.jsonDemo.name }</li>
							<li onClick={this.handleSubmit.bind(this, this.jsonDemo1)}>{ this.jsonDemo1.name }</li>
							<li onClick={this.handleSubmit.bind(this, this.jsonDemo2)}>{ this.jsonDemo2.name }</li>
							<li onClick={this.handleSubmit.bind(this, this.jsonDemo3)}>{ this.jsonDemo3.name }</li>
							<li onClick={this.handleSubmit.bind(this, this.jsonDemo4)}>{ this.jsonDemo4.name }</li>
							<li onClick={this.handleSubmit.bind(this, this.jsonDemo2)}>{ this.jsonDemo2.name }</li>
							<li onClick={this.handleSubmit.bind(this, this.jsonDemo3)}>{ this.jsonDemo3.name }</li>
							<li onClick={this.handleSubmit.bind(this, this.jsonDemo3)}>{ this.jsonDemo3.name }</li>
						</ul>
						<p id="name">{this.state.json.name}</p>
						<p id="score-label">Overall quality score for this location</p>
						<p id="score" className="score-7">7</p>
						<ul className="data-results">
							<li className={this.calcClassName(this.state.json.air)} >Air quality</li>
							<li className={this.calcClassName(this.state.json.school)} >Nearest school</li>
							<li className={this.calcClassName(this.state.json.kindergarten)} >Nearest kindergarten</li>
							<li className={this.calcClassName(this.state.json.bus)} >Nearest bus stop</li>
							<li className={this.calcClassName(this.state.json.safety)} >Traffic safety</li>
							<li className={this.calcClassName(this.state.json.wage)} >Average wage</li>
						</ul>
						<div className="pointer-tail">
							<Isvg src="/pointer-tail.svg" />
						</div>
					</div>
					<div className="map" id="map" />
				</div>
				<div id="section-2">
					<h2>Use locata API service to improve your existing platform!</h2>
					<p>Maecenas posuere risus quis sollicitudin hendrerit. Quisque a auctor turpis, id vulputate felis. Morbi vitae arcu massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In mollis elit non turpis elementum gravida. Mauris sit amet mollis tortor.</p>

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

	handleSubmit(json) {
		this.setState({ lat: json.ycord, lng: json.xcord, stage: 2, json: json }, () => {this.init(this);});
		setTimeout(() => { this.setState({ stage: 3 }) }, 1200);
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

	calcClassName(score) {
		switch (score) {
			case 1:
				return 'p10';
				break;
			case 2:
				return 'p20';
				break;
			case 3:
				return 'p30';
				break;
			case 4:
				return 'p40';
				break;
			case 5:
				return 'p50';
				break;
			case 6:
				return 'p60';
				break;
			case 8:
				return 'p80';
				break;
			case 9:
				return 'p90';
				break;
			case 10:
				return 'p100';
				break;
			default:
				return 'p70';
				break;
		}
	}

	init() {
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

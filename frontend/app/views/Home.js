import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import Slider from 'nw-react-slider';

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
		score: 7,

	};

	state = {
		lat: 59.4373,
		lng: 24.7453,
		zoom: 14,
		value: '',
		stage: 0,
		mapLoaded: false,
		json: this.jsonDemo,
		score: 5,
		airW: 5,
		schoolW: 5,
		kindergartenW: 5,
		busW: 5,
		safetyW: 5,
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
		score: 5,
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
		score: 6,
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
		score: 8,
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
		score: 5,
	};

	jsonDemo5 = {
		name: 'Tallinn, Kullassepa tn 4',
		xcord:"24.7440453340727",
		ycord:"59.4365854277837",
		air: 8,
		school: 8,
		kindergarten: 3,
		bus: 6,
		safety: 9,
		score: 7,
	};

	jsonDemo6 = {
		name: "Tallinn, Tehnika tn 57a",
		xcord:"24.7257701501235",
		ycord:"59.4297695566297",
		air: 8,
		school: 6,
		kindergarten: 6,
		bus: 9,
		safety: 9,
		score: 6,
	};

	jsonDemo7 = {
		name: "Tallinn, Loode tn 14",
		xcord:"24.7253099565622",
		ycord:"59.4327593875511",
		air: 7,
		school: 7,
		kindergarten: 5,
		bus: 7,
		safety: 7,
		score: 5,
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
							<li onClick={this.handleSubmit.bind(this, this.jsonDemo5)}>{ this.jsonDemo5.name }</li>
							<li onClick={this.handleSubmit.bind(this, this.jsonDemo6)}>{ this.jsonDemo6.name }</li>
							<li onClick={this.handleSubmit.bind(this, this.jsonDemo7)}>{ this.jsonDemo7.name }</li>
						</ul>
						<p id="name">{this.state.json.name}</p>
						<p id="score-label">Overall quality score for this location</p>
						<p id="score" className={'score-'+this.state.score} >{ this.state.score }</p>
						<p id="slider-hint">Hover over the bars to change weights</p>
						<ul className="data-results">
							<li className={this.calcClassName(this.state.json.air)} >
								Air quality
								<Slider value={this.state.airW} min={0} max={10} onChange={ this.handleAirChange.bind(this) }/>
							</li>
							<li className={this.calcClassName(this.state.json.school)} >
								Nearest school
								<Slider value={this.state.schoolW} min={0} max={10} onChange={ this.handleSchoolChange.bind(this) }/>
							</li>
							<li className={this.calcClassName(this.state.json.kindergarten)} >
								Nearest kindergarten
								<Slider value={this.state.kindergartenW} min={0} max={10} onChange={ this.handleKindergartenChange.bind(this) }/>
							</li>
							<li className={this.calcClassName(this.state.json.bus)} >
								Nearest bus stop
								<Slider value={this.state.busW} min={0} max={10} onChange={ this.handleBusChange.bind(this) }/>
							</li>
							<li className={this.calcClassName(this.state.json.safety)} >
								Traffic safety
								<Slider value={this.state.safetyW} min={0} max={10} onChange={ this.handleSafetyChange.bind(this) }/>
							</li>
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
					<p><a href="mailto:info@locata.eu"><img src="/subscribe.png" alt="" width="700"/></a></p>
					<ul className="subscribe">
						<li>
							<span className="inner">
								<span className="title">
									Full stack
									<span>For the serius guys.</span>
								</span>
								<span className="content">
									All locations.
								</span>
								<span className="content">
									All 14 data categories.
								</span>
								<span className="footer">
									Contact us!
								</span>
							</span>
						</li>
						<li>
							<span className="inner">
								<span className="title">
									More data
									<span>For the enthusiasts! </span>
								</span>
								<span className="content">
									Limited to one city.
								</span>
								<span className="content">
									All 14 data categories.
								</span>
								<span className="footer">
									Contact us!
								</span>
							</span>
						</li>
						<li>
							<span className="inner">
								<span className="title">
									Full stack
									<span>For the serius guys</span>
								</span>
								<span className="content">
									Limited to one city.
								</span>
								<span className="content">
									Limited to 4 data categories.
									<span>(up to you to choose)</span>
								</span>
								<span className="footer">
									Contact us!
								</span>
							</span>
						</li>
					</ul>
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
		this.setState({ lat: json.ycord, lng: json.xcord, stage: 2, json: json }, () => {this.init(this); this.calculateScore(this);});
		setTimeout(() => { this.setState({ stage: 3 }) }, 1200);
	}

	handleAirChange(value, position) {
		this.setState({ airW:  value}, () => {
			this.calculateScore(this);
		});
	}
	handleSchoolChange(value, position) {
		this.setState({ schoolW:  value}, () => {
			this.calculateScore(this);
		});
	}
	handleKindergartenChange(value, position) {
		this.setState({ kindergartenW:  value}, () => {
			this.calculateScore(this);
		});
	}
	handleBusChange(value, position) {
		this.setState({ busW:  value}, () => {
			this.calculateScore(this);
		});
	}
	handleSafetyChange(value, position) {
		this.setState({ safetyW:  value}, () => {
			this.calculateScore(this);
		});
	}

	calculateScore() {
		const stateNow = this.state;
		const currentJson = stateNow.json;
		const currentJsonList = [currentJson.air, currentJson.school, currentJson.kindergarten, currentJson.bus, currentJson.safety];
		const weightList = [stateNow.airW, stateNow.schoolW, stateNow.kindergartenW, stateNow.busW, stateNow.safetyW];

		const sumWithWeights = currentJsonList.reduce((previousValue, currentValue, currentIndex) => {
			return previousValue + currentValue*weightList[currentIndex];
		}, 0);

		const weightSum = weightList.reduce((previousValue, currentValue) => {
			return previousValue + currentValue;
		}, 0);
		let scoreResult = Math.floor(sumWithWeights / (weightSum * 0.65)) ;

		if (scoreResult > 10) {
			scoreResult = 10;
		} else if (scoreResult < 1) {
			scoreResult = 1;
		}
		this.setState({ score: scoreResult });
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

	calcScoreClassName() {
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

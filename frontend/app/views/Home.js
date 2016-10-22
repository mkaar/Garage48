import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';

import json from 'json!../../adressJson.json';
export default class Home extends Component {

	state = {
		lat : 59.4373,
		lng : 24.7453,
		zoom : 14,
		value : '',
	};

	render() {

		return (
			<div className="locata">
				<div className="container">
					<div className="headerLogo">
						<Isvg src="/Locata-logo.svg" />
					</div>
					<div className="popup input">
						<form
							className="formContent"
							id="form"
							onSubmit={this.handleSubmit.bind(this)}
						>
							<input
								className="input"
								placeholder="Ex. Viru 1 Tallinn"
								value={this.state.value}
								onChange={this.handleChange.bind(this)}
							/>
						</form>
						<ul className="autocomplete-result">
							<li>Tallinn, Veerenni 2</li>
							<li>Tallinn, Veerenni 21</li>
							<li>Tallinn, Veerenni 22</li>
							<li>Tallinn, Veerenni 23</li>
						</ul>
						<ul className="data-result">
							<li className="p20" >Air quality</li>
							<li className="p40" >Nearest school</li>
							<li className="p70" >Nearest bus stop</li>
							<li className="p60" >Traffic safety</li>
							<li className="p100" >Average wage</li>
						</ul>
					</div>
					<div className="map">
						{ this.renderMap(this.state) }
					</div>
				</div>
			</div>
		);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ lat: -34.397 , lng: 150.644 });
	}

	renderMap(state) {
		var form = document.getElementById('form');
		google.maps.event.addDomListener(window, 'load', this.init.bind(this,state));
		google.maps.event.addDomListener(window, 'submit', this.init.bind(this,state));

		return <div id="map"></div>;
	}

	init(state) {
		var mapOptions = {
			zoom: 14,
			disableDefaultUI: true,
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: false,
			scaleControl: false,
			draggable: false,
			disableDoubleClickZoom: true,
			center: new google.maps.LatLng(state.lat, state.lng),
			styles: [
				{
					"featureType": "all",
					"elementType": "labels.text",
					"stylers": [
						{
							"weight": "0.01"
						},
						{
							"saturation": "-100"
						},
						{
							"lightness": "100"
						},
						{
							"visibility": "simplified"
						},
						{
							"color": "#007aa7"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#1ea847"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#444444"
						}
					]
				},
				{
					"featureType": "administrative.country",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"saturation": "1"
						},
						{
							"weight": "0.43"
						}
					]
				},
				{
					"featureType": "administrative.country",
					"elementType": "labels.text",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "administrative.province",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"weight": "0.01"
						},
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "administrative.locality",
					"elementType": "geometry",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "administrative.land_parcel",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#16bf49"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "all",
					"stylers": [
						{
							"color": "#f2f2f2"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "labels",
					"stylers": [
						{
							"color": "#16963d"
						}
					]
				},
				{
					"featureType": "landscape.man_made",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#00cf43"
						}
					]
				},
				{
					"featureType": "landscape.natural",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#05c543"
						}
					]
				},
				{
					"featureType": "landscape.natural.landcover",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#573030"
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "all",
					"stylers": [
						{
							"saturation": -100
						},
						{
							"lightness": 45
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#16bf49"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"color": "#16bf49"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#0e7b2f"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road.highway.controlled_access",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#16bf49"
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#16bf49"
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#16bf49"
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "labels.icon",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#16bf49"
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "transit.line",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#16bf49"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "all",
					"stylers": [
						{
							"color": "#46bcec"
						},
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"saturation": "0"
						},
						{
							"lightness": "-0"
						},
						{
							"gamma": "0"
						},
						{
							"color": "#19b047"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"lightness": "0"
						},
						{
							"gamma": "1.00"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				}
			]};
		var mapElement = document.getElementById('map');
		var map = new google.maps.Map(mapElement, mapOptions);
	}
}

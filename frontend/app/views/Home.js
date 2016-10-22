import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import { Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';

// import json from 'json!../../adressJson.json';
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
					<div className="map">
						{ this.renderMap() }
					</div>
				</div>
			</div>
		);
	}

	renderMap() {
		this.state = {
			lat : 59.4373,
			lng : 24.7453,
			zoom : 14,
		};

		const position = [this.state.lat, this.state.lng];


		google.maps.event.addDomListener(window, 'load', init);

		function init() {
			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
				// How zoomed in you want the map to start at (always required)
				zoom: 15,
				disableDefaultUI: true,
				scrollwheel: false,
				navigationControl: false,
				mapTypeControl: false,
				scaleControl: false,
				draggable: false,
				// The latitude and longitude to center the map (always required)
				center: new google.maps.LatLng(59.4373, 24.7453), // New York

				// How you would like to style the map.
				// This is where you would paste any style found on Snazzy Maps.
				styles: [
					{
						"featureType": "all",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#84e563"
							}
						]
					},
					{
						"featureType": "all",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"gamma": 0.01
							},
							{
								"lightness": 20
							}
						]
					},
					{
						"featureType": "all",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"saturation": -31
							},
							{
								"lightness": -33
							},
							{
								"weight": 2
							},
							{
								"gamma": 0.8
							}
						]
					},
					{
						"featureType": "all",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "landscape",
						"elementType": "geometry",
						"stylers": [
							{
								"lightness": 30
							},
							{
								"saturation": 30
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "geometry",
						"stylers": [
							{
								"saturation": 20
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "geometry",
						"stylers": [
							{
								"lightness": 20
							},
							{
								"saturation": -20
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "geometry",
						"stylers": [
							{
								"lightness": 10
							},
							{
								"saturation": -30
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"saturation": 25
							},
							{
								"lightness": 25
							}
						]
					},
					{
						"featureType": "transit.line",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "all",
						"stylers": [
							{
								"lightness": -20
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					}
				]};

			// Get the HTML DOM element that will contain your map
			// We are using a div with id="map" seen below in the <body>
			var mapElement = document.getElementById('map');

			// Create the Google Map using our element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);

			// Let's also add a marker while we're at it
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(40.6700, -73.9400),
				map: map,
				title: 'Snazzy!'
			});
		}

		return <div id="map"></div>;

	}


}
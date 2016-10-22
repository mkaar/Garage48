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
					</div>
					<div className="formContent">
						<input className="input" placeholder="Type in an address..." />
					</div>
					<div className="popup">
						<ul>
							<li>Air quality</li>
							<li>Nearest school</li>
							<li>Nearest bus stop</li>
							<li>Traffic safety</li>
							<li>Average wage</li>
						</ul>
					</div>
				</div>
				<div className="map">
					{ this.renderMap() }
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
				zoom: 13,
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

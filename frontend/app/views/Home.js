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
		const map = (
			<Map
				center={position}
				zoom={this.state.zoom}
				scrollWheelZoom={false}
				touchZoom={false}
				dragging={false}
				doubleClickZoom={false}
				boxZoom={false}
			>
				<TileLayer
					url='http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
				/>
				<Marker position={position}>
				</Marker>
			</Map>
		);


		return map;

	}


}
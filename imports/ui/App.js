import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import Game from "./Game.js";
import Visual from "./Visual.js";

class App extends Component {

constructor(props)
{
	super(props);
	this.state = {
		article_name: "Sherlock Holmes",
		nodes: [],
		arcs:[],
		links: [],
	}
}


handleClickOnLink(nombre)
{
	var arcs_new = this.state.arcs;
	var nodes_new = this.state.nodes;
	arcs.push({source: this.state.article_name , target: nombre });
	nodes.push({article_name: nombre});

	var temp = nombre.replace(/ /g, "_");

	var links_new = fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${temp}&prop=links&pllimit=500&format=json`)
						.then((data)=>data.json())
						.then(json => console.log(json));

	this.setState({article_name: nombre,
					nodes: nodes_new,
					arcs: arcs_new	
					});
}

	render() {
		let user = this.props.currentUser;
		return (
			<Game links = {this.state.links} handleClickOnLink = {this.handleClickOnLink}/>
			<Visual nodes={this.state.nodes} arcs={this.state.arcs}/>
			);
	}
}
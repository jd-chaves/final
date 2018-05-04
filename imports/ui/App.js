import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

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

componentDidMount() {
  handleClickOnLink(this.this.state.article_name);
  console.log(this.state);
}

handleClickOnLink(nombre)
{
	var arcs_new = this.state.arcs;
	var nodes_new = this.state.nodes;
	arcs.push({source: this.state.article_name , target: nombre });
	nodes.push({article_name: nombre});

	var temp = nombre.replace(/ /g, "_");

	const links_new_json = fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${temp}&prop=links&pllimit=500&format=json`)
						.then((data)=>data.json())
						.then(json => console.log(json));

	var links_new = links_new_json.query.pages.links.map((l)=>l.title)


	this.setState({article_name: nombre,
					nodes: nodes_new,
					arcs: arcs_new,
					links: links_new
					});
}

	render() {
		let user = this.props.currentUser;
		return (
			<div>
			<Game links = {this.state.links} handleClickOnLink = {this.handleClickOnLink}/>
			<Visual nodes={this.state.nodes} arcs={this.state.arcs}/>
			</div>
			);
	}
}
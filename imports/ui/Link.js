import React, { Component } from "react";
import { Meteor } from "meteor/meteor";



export default class Game extends Component {
	constructor(props)
	{
		this.state={
			article_name: this.props.article_name,
		}
	}

	handleClick()
	{
		this.props.handleClickOnLink(this.state.article_name);
	}

	render() {
		return (
			<button onClick={this.handleClick}>this.state.article_name</button>
		);
	}
}

import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import Link from "./Link.js";


export default class Game extends Component {
	render() {
		return (
			this.props.links.map((l)=>  <Link article_name={l} handleClickOnLink={this.props.handleClickOnLink}/>)
		);
	}
}

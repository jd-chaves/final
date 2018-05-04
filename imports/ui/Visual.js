import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import d3 from 'd3'



export default class Visual extends Component {



	componentDidMount(){

		var nodes = this.props.nodes;
		var arcs = this.props.arcs;

		const width = 800;
		const height = 800;

		var canvas = d3.select(this.canvas), ctx = canvas.node().getContext("2d");
		r=30;
		color = d3.scaleOrdinal(d3.schemeCategory20),
		simulation = d3.forceSimulation()
								.force("x", d3.forceX(width/2))
								.force("y", d3.forceY(height/2))
								.force("collide", d3.forceCollide(r+1))
								.force("charge", d3.forceManyBody().strength(-100))
								.on("tick", update)
								.force("link", d3.forceLink()).id((d)=> d.article_name);


		simulation.nodes(nodes);
		simulation.force("link")
				  .links(arcs);

		
      	  canvas
      	  	.call(d3.drag()
          	.container(canvas.node())
          	.subject(dragsubject)
          	.on("start", dragstarted)
          	.on("drag", dragged)
          	.on("end", dragended));

		function update()
		{
			ctx.clearRect(0, 0 ,width, height);
			
			ctx.beginPath();
			arcs.forEach(drawLink);
			ctx.stroke();

			
			nodes.forEach(drawNode);
			function dragsubject() {
    			return simulation.find(d3.event.x, d3.event.y);
  			}
			
		}

		function dragstarted() {
 			 if (!d3.event.active) simulation.alphaTarget(0.3).restart();
 				 d3.event.subject.fx = d3.event.subject.x;
 				 d3.event.subject.fy = d3.event.subject.y;
			}

		function dragged() {
  			 d3.event.subject.fx = d3.event.x;
 			 d3.event.subject.fy = d3.event.y;
			}
			
		function dragended() {
 			 if (!d3.event.active) simulation.alphaTarget(0);
  				d3.event.subject.fx = null;
  				d3.event.subject.fy = null;
			}

		function drawNode(d){

				 ctx.beginPath();
				 ctx.fillStyle = color(d.party);
				 ctx.moveTo(d.x, d.y);
				 ctx.arc(d.x, d.y, r, 0, Math.PI*2); 
				 ctx.fill();
		}

		function drawLink(l){
				 ctx.moveTo(l.x, l.y);
				 ctx.arc(l.x, l.y, r, 0, Math.PI*2); 
		}

	}

	render() {
		return (
			<div className = "network-div">
				<canvas id="network" 
						width="800" 
						height="800"
						ref = {(cvs)=>this.cvs = cvs}
						></canvas>
			</div>
		);
	}
}

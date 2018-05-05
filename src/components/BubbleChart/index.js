import React, { Component } from 'react';
import * as d3 from 'd3';

import './style.scss';

export default class BubbleChart extends Component {
  constructor() {
    super();

    this.width = 960;
    this.height = 720;
  }

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.createChart();
  }

  getCircleSize = d => (5 - d.quartile_rank) * 5;
  getCirclePosition = (distance, d) => d.quartile_score === 1 ? null : (d.quartile_score - 1) * distance * 1.5;

  createChart = () => {
    const node = d3.select(this.node);
    const width = this.width;
    const height = this.height;
    const distance = 100;

    node.selectAll('circle.bubble-chart__group')
      .data([3,2,1]).enter().append('circle')
      .attr('class', d => `bubble-chart__group bubble-chart__group_nr_${ d }`)
      .attr('r', d => d * distance);

    const groups = node.selectAll('.bubble-chart__bubble')
      .data(this.props.data).enter().append('g')
      .attr('class', 'bubble-chart__bubble');

    groups.append('circle')
      .attr('r', this.getCircleSize)
      .attr('class', 'bubble-chart__bubble-circle');

    groups.append('text')
      .attr('class', 'bubble-chart__tooltip')
      .attr('dx', d => this.getCircleSize(d))
      .attr('dy', d => -this.getCircleSize(d))
      .text(d => d.word);

    const simulation = d3.forceSimulation()
      .force('charge', d3.forceManyBody().strength(-75))
      .force('collide', d3.forceCollide().radius(this.getCircleSize))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('radial', d3.forceRadial(this.getCirclePosition.bind(null, distance), width / 2, height / 2))
      .force("y", d3.forceY(0))
      .force("x", d3.forceX(0));

    const ticked = () => {
      groups.attr("style", d => `transform: translate(${ d.x }px,${ d.y }px)`);
    };

    simulation.nodes(this.props.data)
      .on('tick', ticked);
  };

  render() {
    const { width, height } = this;

    return (
      <div className="bubble-chart">
        <svg width={ width } height={ height } ref={node => this.node = node} className="bubble-chart__svg" preserveAspectRatio="xMinYMin meet" viewBox={`0 0 ${ width } ${ height }`}></svg>
      </div>
    );
  }
}
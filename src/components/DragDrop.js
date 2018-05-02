import React, {Component} from 'react'
import * as d3 from "d3"
let startingCircleX = 500
let startingCircleY = 400
let startingRectX = 90
let startingRectY = 390

class DragDrop extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    let mainContainer = d3.select(this.refs.svgContainer)
    // Append starting line
    mainContainer.append('line')
    .style('stroke', 'black')
    .attr('x1', 100)
    .attr('y1', 400)
    .attr('x2', 500)
    .attr('y2', 400)

    mainContainer.append('rect')
      .attr('width', '20px')
      .attr('height', '20px')
      .attr('x', startingRectX)
      .attr('y', startingRectY)
      .style('fill', 'red')

    mainContainer.append('circle')
      .attr('r', 10)
      .attr('cx', startingCircleX)
      .attr('cy', startingCircleY)
      .style('fill', 'red')

    d3.select('rect').call(d3.drag()
      .on('drag', function() {
        let coordinates = d3.mouse(this)
        let cx = coordinates[0]
        let cy = coordinates[1]
        mainContainer.selectAll('line')
          .transition().delay(0).duration(1)
          .attr('x1', d3.select('circle').attr('cx'))
          .attr('y1', d3.select('circle').attr('cy'))
          .attr('x2', Number(d3.select('rect').attr('x')) + 10)
          .attr('y2', Number(d3.select('rect').attr('y')) + 10)
        d3.select('rect')
          .attr('x', cx - 10)
          .attr('y', cy - 10)
        })
        .on('end', () => {
          d3.select('rect').transition()
            .attr('x', startingRectX)
            .attr('y', startingRectY)
            .duration(1000)
            .ease(d3.easeElastic)
          mainContainer.selectAll('line').transition()
            .duration(1000)
            .attr('x2', startingRectX + 10)
            .attr('y2', startingRectY + 10)
            .ease(d3.easeElastic)
        })
      )

    d3.select('circle').call(d3.drag()
      .on('drag', function() {
        let coordinates = d3.mouse(this)
        let cx = coordinates[0]
        let cy = coordinates[1]
        mainContainer.selectAll('line')
          .attr('x1', d3.select('circle').attr('cx'))
          .attr('y1', d3.select('circle').attr('cy'))
          .attr('x2', Number(d3.select('rect').attr('x')) + 10)
          .attr('y2', Number(d3.select('rect').attr('y')) + 10)
        d3.select('circle')
          .attr('cx', cx)
          .attr('cy', cy)
      })
      .on('end', () => {
        d3.select('circle').transition()
          .attr('cx', startingCircleX)
          .attr('cy', startingCircleY)
          .duration(1000)
          .ease(d3.easeElastic)
          mainContainer.selectAll('line').transition()
            .duration(1000)
            .attr('x1', startingCircleX)
            .attr('y1', startingCircleY)
            .ease(d3.easeElastic)
      })
    )
  }

  render() {
    return(
      <svg width='600px' height='800px' ref='svgContainer' className='svgContainer'></svg>
    )
  }
}

export default DragDrop

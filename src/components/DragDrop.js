import React, {Component} from 'react'
import * as d3 from "d3"

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
    .attr('x1', 48 + 10)
    .attr('y1', 168 + 10)
    .attr('x2', 138)
    .attr('y2', 50)

    mainContainer.append('rect')
      .attr('width', '20px')
      .attr('height', '20px')
      .attr('x', 48)
      .attr('y', 168)
      .style('fill', 'red')

    mainContainer.append('circle')
      .attr('r', 10)
      .attr('cx', 138)
      .attr('cy', 50)
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
    )
  }

  render() {
    return(
      <svg width='600px' height='800px' ref='svgContainer' className='svgContainer'></svg>
    )
  }
}

export default DragDrop

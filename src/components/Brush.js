import React, {Component} from 'react'
import * as d3 from "d3"

class Brush extends Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    let randomX = d3.randomUniform(10, 590)
    let randomY = d3.randomUniform(180, 220)
    let mainData = d3.range(400).map(() => [randomX(), randomY()])
    this.setState({mainData: mainData})
  }

  componentDidUpdate() {
    let brushContainer = d3.select(this.refs.brushContainer)
    let brushX = d3.brushX()

    brushContainer.append('line')
      .style('stroke', 'black')
      .attr('x1', 0)
      .attr('y1', 200)
      .attr('x2', 600)
      .attr('y2', 200)

    brushContainer.append('g')
      .attr('class', 'brush')
      .selectAll('circle')
        .data(this.state.mainData)
        .enter().append('circle')
          .attr('r', 3)
          .style('fill', 'red')
          .attr('fill-opacity', 0.5)
          .attr('transform', (d) => 'translate(' + d[0] + ',' + d[1] + ')')

    let brush = d3.select('.brush')
    brush.call(brushX.extent([[0,140], [600, 260]]))
    brushX.move(brush, [0,50])

    brushX.on('brush', () => console.log(d3.event))
  }

  render() {
    return(
      <svg height='400px' width="600px" ref='brushContainer' className='brushContainer'></svg>
    )
  }


}



export default Brush

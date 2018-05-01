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
    let mainData = d3.range(200).map(() => [randomX(), randomY()])
    this.setState({mainData: mainData})
  }

  componentDidUpdate() {
    let mainContainer = d3.select(this.refs.brushContainer)
    let brush = d3.brushX()

    mainContainer.append('line')
      .style('stroke', 'black')
      .attr('x1', 0)
      .attr('y1', 200)
      .attr('x2', 600)
      .attr('y2', 200)

    mainContainer.append('g')
      .attr('class', 'brush')
      .selectAll('circle')
        .data(this.state.mainData)
        .enter().append('circle')
          .attr('class', 'circle')
          .attr('r', 3)
          .style('fill', 'grey')
          .attr('fill-opacity', 0.5)
          .attr('transform', (d) => 'translate(' + d[0] + ',' + d[1] + ')')

    let brushContainer = d3.select('.brush')
    brushContainer.call(brush.extent([[0,140], [600, 260]]))
    brush.move(brushContainer, [0,50])

    brush.on('brush', (d) => {
      let brushPosition = d3.select('.selection').attr('x')
      let circlesSelector = document.querySelectorAll('.circle')
      circlesSelector.forEach(circle => {
        let eachCircleX = circle.__data__[0]
        if (eachCircleX > brushPosition && eachCircleX < (Number(brushPosition) + 50)) {
          d3.select(circle).style('fill', 'blue')
        } else {
          d3.select(circle).style('fill', 'grey')
        }
      })
    })
  }

  render() {
    return(
      <svg height='800px' width="600px" ref='brushContainer' className='brushContainer'></svg>
    )
  }


}



export default Brush

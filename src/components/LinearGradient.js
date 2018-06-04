import React, { Component } from 'react'
import * as d3 from 'd3'

const height = '400px'
const width = '400px'
let dataPoints = []
const x1 = 0
const x2 = 400
let y1 = 0
let y2 = 400

class LinearGradient extends Component {

  componentDidMount() {
    this.linearContainer = d3.select(this.refs.linearGradient)
    this.linearContainer.style('background-color', 'black')
    this.addDot()
    this.linearContainer.append('line')
      .attr('class', 'linearLine')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
  }

  drawLine() {
    if (dataPoints.length < 2) {
      return
    }
    console.log(dataPoints)
    let xSum = 0
    let ySum = 0
    dataPoints.forEach( data => {
      xSum += data[0]
      ySum += data[1]
    })
    let xMean = xSum/dataPoints.length
    let yMean = ySum/dataPoints.length

    let sumNumerator = 0
    let sumDenominator = 0
    dataPoints.forEach(data => {
      sumNumerator += ((data[0]-xMean)*(data[1]-yMean))
      sumDenominator += ((data[0] - xMean)**2)
    })

    const m = sumNumerator/sumDenominator
    const b = yMean - (m*xMean)

    console.log(dataPoints)
    console.log(b)

    y1 = -((m*x1 + b) -400)
    y2 = -( (m*x2 + b) - 400)

    d3.select('.linearLine')
      .transition()
      .attr('stroke', 'red')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
  }

  addDot() {
    this.linearContainer.on('click', (d, i, nodes) => {
      let x = d3.mouse(nodes[0])[0]
      let y = d3.mouse(nodes[0])[1]
      let ammendedY = -(y -400)
      dataPoints.push([x, ammendedY])
      d3.select(nodes[0]).append('circle')
        .attr('r', 4)
        .attr('cx', x)
        .attr('cy', y)
        .style('fill', 'white')
      this.drawLine()

    })
  }

  render() {
    return(
      <svg height={height} width={width} ref='linearGradient'>
      </svg>
    )
  }
}


export default LinearGradient

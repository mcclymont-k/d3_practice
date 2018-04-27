import React, {Component} from 'react'
import * as d3 from "d3"

class PieChart extends Component {

  constructor() {
    super()
    this.state = {
      nameLengths: []

    }
  }

  componentWillMount() {
    fetch('https://randomuser.me/api/?results=10')
      .then(result => result.json())
      .then(data => {
        let results = data.results
        let nameLengths = []
        let nameFinal = []
        data.results.forEach(data => {
          let nameLength = data.name.first.split('').length + data.name.last.split('').length
          nameLengths.push(nameLength)
        })
        let maxNum = Math.max.apply(null, nameLengths)
        let minNum = Math.min.apply(null, nameLengths)
        for (let i = minNum; i <= maxNum; i++) {
          let nameHolder = []
          nameLengths.forEach(name => name === i ? nameHolder.push(name) : '')
          nameHolder.length > 0 ? nameFinal.push(nameHolder): ''
        }
        nameFinal.forEach(nameArray => {
          let length = nameArray.length
          let key = nameArray[0]
          let obj = {
            name: key,
            length: length
          }
          let originalArray = this.state.nameLengths
          originalArray.push(obj)
        })
        this.setState(nameLengths: originalArray)
      })
  }

  angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI -90;
    return a > 90 ? a - 180 : a;
  }

  makeChart() {
    let lengthOfNames = this.state.nameLengths.length
    let color = d3.scaleLinear()
      .domain([0, lengthOfNames])
      .range(['#3e96bc', 'red'])
    let mainContainer = d3.select(this.refs.svgContainer)
    let arc = d3.arc().outerRadius(250).innerRadius(0)
    let textArc = d3.arc().outerRadius(250).innerRadius(150)
    let pieArray = []
    this.state.nameLengths.forEach(name => pieArray.push(name.length))
    let pie = d3.pie().value(d => d.length)(this.state.nameLengths)
    // let pie = d3.pie().value(d => d)(pieArray)
    let g = mainContainer.selectAll('.arc')
      .data(pie)
      .enter().append('g')
      .attr('class', 'arc')
      .attr('transform', 'translate(300,400)')
    g.append('path')
      .attr('d', arc)
      .style('fill', (d) => color(d.index))
      .on('mouseover', (d,i,n) =>
        d3.select(d3.event.target.nextElementSibling)
          .transition()
          .style('opacity', '1')
          .duration(300)
      )
      .on('mouseout', (d,i,n) =>
        d3.select(d3.event.target.nextElementSibling)
          .transition()
          .style('opacity', '0')
          .duration(300)
      )

    g.append('text')
      .text((d) => {
        return 'Name Length: ' + d.data.name
      })
      .attr('text-anchor', 'middle')
      .attr("transform", (d) =>
        'translate(' + textArc.centroid(d) + ')' + " rotate(" + this.angle(d) + ")"
      )
      .style('font-size', '8px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .style('opacity', 0)
  }

  render() {
    return(
      <svg height='800px' width='600px' ref='svgContainer' className='svgContainer'>{this.makeChart()}</svg>
    )
  }
}

export default PieChart

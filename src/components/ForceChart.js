import React, {Component} from 'react'
import * as d3 from "d3"

let data = [{name: 'Kieran'}, {name: "Sarah"}, {name: 'Gwiian'}, {name: 'John'}]
const height = 800
const width = 600
const radius = 10
let simulation = d3.forceSimulation()
  .force('center', d3.forceCenter(300, 400))
  .force('charge', d3.forceManyBody().strength(-30))
  .stop()


class ForceChart extends Component {

  constructor(props) {
    super(props)
    this.forceTick = this.forceTick.bind(this)
    this.state ={}

  }

  componentWillMount() {
    simulation.on('tick', this.forceTick)
  }

  componentDidMount() {
    this.setState({data: data})
    this.forceContainer = d3.select(this.refs.forceContainer)
    this.renderShapes()
    simulation.nodes(data).alpha(0.9).restart()

  }

  componentDidUpdate() {
    this.renderShapes()
  }

  renderShapes() {
    this.circles = this.forceContainer.selectAll('circle')
      .data(data, d => d.name)

    this.circles.exit().remove()

    this.circles.enter().append('circle')
      .merge(this.circles)
      .attr('r', radius)
  }

  forceTick() {
    this.forceContainer.selectAll('circle').attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }

  render() {
    return(
      <svg height={height} width={width} ref='forceContainer'></svg>
    )
  }
}

export default ForceChart

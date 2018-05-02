import React, {Component} from 'react'
import * as d3 from "d3"

let data = [{name: 'Kieran'}, {name: "Sarah"}, {name: 'Gwiian'}, {name: 'John'},
 {name: 'John'}, {name: 'John'}, {name: 'John'}, {name: 'John'}, {name: 'John'}, {name: 'John'}]
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
    this.state ={
      strength: -30
    }
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
    simulation.force('charge', d3.forceManyBody().strength(this.state.strength))
    simulation.nodes(data).alpha(0.9).restart()
  }

  renderShapes() {
    let color = d3.scaleOrdinal()
      .domain([0,9])
      .range(['#1992cb', 'red', 'yellow', '#5bef5b', 'purple', '#c0ab38', 'black', 'lightblue', 'indigo', '#f3bceecc'])
    this.circles = this.forceContainer.selectAll('circle')
      .data(data, d => d.name)

    this.circles.exit().remove()

    this.circles.enter().append('circle')
      .merge(this.circles)
      .attr('r', radius)
      .style('fill', (d, i) => color(i))
      .attr('opacity', 0.8)
  }

  forceTick() {
    this.forceContainer.selectAll('circle').attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }

  changeStrength(e) {
    e.preventDefault()
    this.setState({strength: Number(this.textInput.value)})
  }

  render() {
    return(
      <div className="mainForceContainer">
        <svg height={height} width={width} ref='forceContainer'></svg>
        <form onSubmit={e => this.changeStrength(e)} className='mainInput'>
          <input placeholder='Press enter to submit' type='text'ref={input => this.textInput = input}></input>
        </form>
      </div>
    )
  }
}

export default ForceChart

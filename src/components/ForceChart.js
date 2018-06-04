import React, {Component} from 'react'
import * as d3 from "d3"

let data = [
  [{name: 'Kieran', age: 17},
  {name: "Sarah", age: 17},
  {name: 'Gwiian', age:17},
  {name: 'John', age: 17},
  {name: 'John', age: 17},
  {name: 'John', age: 17}],
  [{name: 'John',age:17},
  {name: 'John', age: 17},
  {name: 'John', age: 17},
  {name: 'John', age:17}]
]

const height = 800
const width = 600
let radius = 10
let simulation = d3.forceSimulation()
  .force('center', d3.forceCenter(300, 400))
  .force('charge', d3.forceManyBody().strength(30))
  .force('collide', d3.forceCollide(10))
  .velocityDecay(0.3)
  .stop()
let maleFemaleSim = d3.forceSimulation()
  .force('charge', d3.forceManyBody().strength(80))
  .force('center', d3.forceCenter(200, 100))
  .velocityDecay(0.3)
  .stop()

class ForceChart extends Component {

  constructor(props) {
    super(props)
    this.forceTick = this.forceTick.bind(this)
    this.state ={
      strength: 30,
      currentImage: 'https://vignette.wikia.nocookie.net/austinally/images/1/14/Random_picture_of_shark.png/revision/latest?cb=20150911004230',
    }
  }

  componentWillMount() {
    simulation.on('tick', this.forceTick)
  }

  componentDidMount() {
    this.setState({data: data})
    this.forceContainer = d3.select(this.refs.forceContainer)
    this.renderShapes()
    simulation.nodes(data).alpha(0.9).alphaMin(0.05).restart()
    console.log(data)
  }

  componentDidUpdate() {
    this.renderShapes()
    simulation.force('charge', d3.forceManyBody().strength(this.state.strength))
    simulation.nodes(data).alpha(0.9).restart()
  }

  manageImagePosition() {
    console.log(d3.select(d3.event.target))
  }

  renderShapes() {
    let color = d3.scaleOrdinal()
      .domain([0,9])
      .range(['#1992cb', 'red', 'yellow', '#5bef5b', 'purple', '#c0ab38', 'black', 'lightblue', 'indigo', '#f3bceecc'])
    this.circles = this.forceContainer.selectAll('circle')
      .data(data)

    this.circles.exit().remove()

    const factor = 7
    let clicked = false
    this.circles.enter().append('svg:circle')
      .attr('r', 10)
      .style('fill', (d, i) => color(i))
      .attr('opacity', 0.8)

    this.circles.on('click', (d, i) => {
        // let menArray = []
        // let womenArray = []
        //
        // let circleNodes = this.forceContainer.selectAll('circle').nodes()
        // circleNodes.forEach(node => node.__data__.name === 'John'
        // ? menArray.push(node)
        // : womenArray.push(node))
        // console.log(menArray)
        //
        // maleFemaleSim.on('tick', this.forceTick)
        // this.renderShapes()
        // maleFemaleSim.nodes(menArray).alpha(0.9).alphaMin(0.05).restart()
        let selectedData = d3.select(d3.event.target).data()
        let target = d3.select(d3.event.target)
        if (d3.select(d3.event.target).attr('r') == 70) {
          simulation.force('charge', d3.forceManyBody().strength(80))
          console.log(d.data)
          simulation.force('center', () => d3.forceCenter(200, 100))
          simulation.nodes(data).alpha(0.9).restart()
          d3.select(d3.event.target)
            .attr('r', 10)
          clicked = false
        } else {
          clicked
          ? console.log('true clicked')
          : (console.log('false clicked'),
            this.renderMoreShapes(selectedData[0]),
            simulation.force('charge', d3.forceManyBody().strength(-30)),
            simulation.nodes(data).alpha(0.9).restart(),
            this.forceContainer.selectAll('circle')
              .nodes().forEach(circle =>
                d3.select(circle)
                  .attr('r', 10)),
            d3.select(d3.event.target)
              .attr('r', 70),
            clicked = true)
        }

      })
  }

  renderMoreShapes(event) {
    console.log(event)
    let color = d3.scaleOrdinal()
      .domain([0,9])
      .range(['#1992cb', 'red', 'yellow', '#5bef5b', 'purple', '#c0ab38', 'black', 'lightblue', 'indigo', '#f3bceecc'])
    let newCircles = this.forceContainer.selectAll('.babyCircles')
      .data(event)

    newCircles.exit().remove()

    const factor = 7
    let clicked = false
    newCircles.enter().append('svg:circle')
      .attr('r', 10)
      .style('fill', (d, i) => color(i))
      .attr('opacity', 0.8)
      .attr('cx', '307.3736887807832px')
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

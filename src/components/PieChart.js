import React, {Component} from 'react'
import * as d3 from "d3"

class PieChart extends Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    return(
      <svg height='800px' width='600px' ref='svgContainer' className='svgContainer' />
    )
  }
}

export default PieChart

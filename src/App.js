import React, { Component } from 'react';
import './App.css';
import DragDrop from './components/DragDrop'
import PieChart from './components/PieChart'
import TopBar from './components/TopBar'
import Brush from './components/Brush'

class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <div className="mainContainer">
          <h1>Drag and drop</h1>
          <h2>A d3 svg that allows you to drag and drop the rectangle and circle. The line will always follow</h2>
          <DragDrop />
          <div className='spacer'></div>
          <h1>Pie Chart</h1>
          <h2>This pie chart is pulling data from an api and calaculating the
          number of charachters in a random selection of peoples names.
          On hover it shows what the name length of the category
          is and the wedge size shows the quantity of people in that category</h2>
          <PieChart />
          <div className='spacer'></div>
          <h1>Other Chart</h1>
          <h2>An other thing</h2>
          <Brush />
        </div>
      </div>
    );
  }
}

export default App;

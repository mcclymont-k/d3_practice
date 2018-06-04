import React, { Component } from 'react';
import './App.css';
import DragDrop from './components/DragDrop'
import PieChart from './components/PieChart'
import TopBar from './components/TopBar'
import Brush from './components/Brush'
import ForceChart from './components/ForceChart'
import LinearGradient from './components/LinearGradient'

class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <div className="mainContainer">
          <h1>Drag and drop</h1>
          <h2>
            A d3 svg that allows you to drag and drop the rectangle and circle.
            The line will always follow
          </h2>
          <DragDrop />
          <div className='spacer'></div>
          <h1>Pie Chart</h1>
          <h2>
            This pie chart is pulling data from an api and calaculating the
            number of charachters in a random selection of peoples names.
            On hover it shows what the name length of the category
            is and the wedge size shows the quantity of people in that category
          </h2>
          <PieChart />
          <div className='spacer'></div>
          <h1>Brush chart</h1>
          <h2>
            This brush chart places random data on the graph and then uses the
            brusher to change the styling of the underlying data. Click and drag
            the brusher to see the change
          </h2>
          <Brush />
          <div className='spacer'></div>
          <h1>Force Chart</h1>
          <h2>A force chart - the data pieces have forces on them that
          keep them an exact distance apart or atract them together. Change the
          strength of the force by entering a number into the text field and
          pressing enter. +ve numbers are attractive, -ve numbers are repulsive.</h2>
          <ForceChart />
          <div className='spacer'></div>
          <h1>Linear Gradient</h1>
          <h2>
            Click on the svg to display a data node. After 2 nodes are placed, the graph will
            calculate the linear gradient and display it as a red line. This demonstrates
            the line of best fit for the data presented. The coefficient of determination
            shows us the confidence value. The closer to 1 it is, the more representative
            the line is of the data, the closer to 0 it is, the less likely it is that
            the 2 values have a linear relationship.
          </h2>
          <LinearGradient />
        </div>
      </div>
    );
  }
}

export default App;

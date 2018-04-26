import React, { Component } from 'react';
import './App.css';
import DragDrop from './components/DragDrop'
import PieChart from './components/PieChart'
import TopBar from './components/TopBar'

class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <div className="mainContainer">
          <h1>Drag and drop</h1>
          <DragDrop />
          <div className='spacer'></div>
          <h1>Pie Chart</h1>
          <PieChart />
          <div className='spacer'></div>
          <h1>Other Chart</h1>
        </div>
      </div>
    );
  }
}

export default App;

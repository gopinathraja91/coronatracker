import React, { Component } from 'react';
import Covidetails from './covidDetails'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      stateDistList : '',
      stateTotal : '',
    }
  }

  componentDidMount(){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
    };

    fetch("https://api.covid19india.org/state_district_wise.json",requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log("dist",result)
        this.setState({ stateDistList: result })
      })
      .catch(error => console.log('error', error));
    
    fetch("https://api.covid19india.org/data.json",requestOptions)
    .then(response => response.json())
    .then(result => {
        let listInfo={};
        Object.entries(result.statewise).map((key) => {
          listInfo[key[1].statecode]=key[1]
        })
        //console.log("state",listInfo)
      this.setState({ stateTotal: listInfo })
    })
    .catch(error => console.log('error', error));
      
    //https://corona-api.com/countries/IN
  }

  
  render() {
    return (
      <Covidetails coviddetails={this.state.stateDistList && this.state.stateDistList} stateList={ this.state.stateTotal && this.state.stateTotal}></Covidetails>
    );
  }
}

export default App;

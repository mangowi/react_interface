import React, { Component } from 'react';
import '../css/App.css';
import AddApointments from './AddApointments';
import SearchApointments from './SearchApointments';
import ListApointments from './ListApointments';

import {without} from 'lodash';

class App extends Component {
  constructor(){
    super();//Allows to get information from the parent component
    this.state = {
      // Initializing the object
      //myName : 'Daniel Mangowi',
      myAppointmenst: [],
      formDisplay: false,
      lastIndex: 0
    };

    this.deleteApointment = this.deleteApointment.bind(this); 
    this.toggleFormDisplayD = this.toggleFormDisplayD.bind(this);
  }
  
  deleteApointment(apt){
    let tempApts = this.state.myAppointmenst;
    tempApts = without(tempApts, apt); // using lodash to filter apointment that has no this apt we pass
  
  
    this.setState({
      myAppointmenst: tempApts
    })
  }

  toggleFormDisplayD(){
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

   componentDidMount(){
     fetch('./data.json') // we are using fetch but can use jquery get or post or get
        .then(response => response.json()) // specifying response is coming as json format
        .then(result => {
          // processing the result in a variable and go through each of the element on the file
          const apts = result.map(item=>{
            item.aptId= this.state.lastIndex;
            this.setState({lastIndex: this.state.lastIndex + 1 });
            return item;
          })

          // Always create a variable before setting up data to the state
          this.setState({
            myAppointmenst: apts
          })
        })

        
   }
  render() {

    
    return (
      <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
                {this.state.myName}
                <AddApointments
                formDisplay={this.state.formDisplay}
                toggleFormDisplay= {this.toggleFormDisplayD}
                />
                <SearchApointments />
                <ListApointments appointments={this.state.myAppointmenst}
                deleteApointment = {this.deleteApointment}
                />
            </div>
          </div>
        </div>
      </div>
    </main>

    );
  }
}

export default App;

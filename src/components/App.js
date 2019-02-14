import React, { Component } from 'react';
import '../css/App.css';
import AddApointments from './AddApointments';
import SearchApointments from './SearchApointments';
import ListApointments from './ListApointments';

import {without, findIndex} from 'lodash';

class App extends Component {
  constructor(){
    super();//Allows to get information from the parent component
    this.state = {
      // Initializing the object
      //myName : 'Daniel Mangowi',
      myAppointmenst: [],
      formDisplay: false,
      orderBy: 'ownerName',
      orderDir:'desc',
      queryText: '',
      lastIndex: 0
    };

    this.deleteApointment = this.deleteApointment.bind(this); 
    this.toggleFormDisplayD = this.toggleFormDisplayD.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updatePateInfo = this.updatePateInfo.bind(this);



  }
  
  updatePateInfo(name, value, id){
      let tempApts = this.state.myAppointmenst;
      let aptIndex = findIndex(this.state.myAppointmenst, {
        aptId: id
      });
      // Modify the record
      tempApts[aptIndex][name] = value;
      this.setState({
        myAppointmenst: tempApts
      })
  }
  searchApts(query){
    this.setState({
      queryText: query
    })
  }

  changeOrder(order, dir){
    this.setState({
      orderBy: order,
      orderDir: dir
    })
  }


  addAppointment(apt){
    let tempApts = this.state.myAppointmenst;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointmenst: tempApts,
      lastIndex: this.lastIndex +1
    })
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

    // When we start to render and when we start displaying the data
    let order;
    let filteredApts = this.state.myAppointmenst;
    if(this.state.orderDir === 'asc'){
      order = 1;

    }else{
      order = -1;
    }
    filteredApts = filteredApts.sort((a,b)=>{
      if(a[this.state.orderBy].toLowerCase()<
      b[this.state.orderBy].toLowerCase()
    ){
      return -1 * order;
    }else{
      return 1 * order;
    }
    }).filter(eachItem =>{
      return(

     
      eachItem['petName']
      .toLowerCase()
      .includes(this.state.queryText.toLowerCase()) ||
      eachItem['ownerName']
      .toLowerCase()
      .includes(this.state.queryText.toLowerCase()) ||
      eachItem['aptNotes']
      .toLowerCase()
      .includes(this.state.queryText.toLowerCase()) 
    );
    });

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
                addAppointment={this.addAppointment}
                />
                <SearchApointments
                 orderBy={this.state.orderBy}
                 orderDir={this.state.orderDir}
                 changeOrder={this.changeOrder}
                 searchApts={this.searchApts}// we can call local function any name as we want
                />
                <ListApointments appointments={filteredApts}
                deleteApointment = {this.deleteApointment}
                updateInfo= {this.updatePateInfo}
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

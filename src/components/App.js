import React, { Component } from 'react';
import '../css/App.css';
import AddApointments from './AddApointments';
import SearchApointments from './SearchApointments';
import ListApointments from './ListApointments';



class App extends Component {
  render() {
    return (
      <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
                <AddApointments />
                <SearchApointments />
                <ListApointments />
            </div>
          </div>
        </div>
      </div>
    </main>

    );
  }
}

export default App;

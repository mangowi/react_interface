import React, {Component} from 'react';



class ListApointments extends Component{
    render(){
        // temp variable
        const listItems = this.props.appointments.map(item=>(
        <div>
            <div>{item.petName}</div>
            <div>{item.ownerName}</div>
          </div>
         // passing data here now we cant modify them as we ass as props
      ));
        return<div>{listItems}</div>
    }
}

export default ListApointments;
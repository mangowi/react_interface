import React, {Component} from 'react';
import {FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

class ListApointments extends Component{
    render(){
        // temp variable
        /*const listItems = this.props.appointments.map(item=>(
        <div>
            <div>{item.petName}</div>
            <div>{item.ownerName}</div>
          </div>
         // passing data here now we cant modify them as we ass as props
      ));*/
        return(
            <div className="appointment-list item-list mb-3">
                {this.props.appointments.map(item=>(
                            // we need paranthis because we add html
                            <div className="pet-item col media py-3" key={item.aptId}>
                            <div className="mr-3">
                            <button className="pet-delete btn btn-sm btn-danger"
                            onClick={(e)=> this.props.deleteApointment(item)}
                            >
                            <FaTimes/>
                            </button>
                            </div>

                            <div className="pet-info media-body">
                            <div className="pet-head d-flex">
                                <span className="pet-name">{item.aptId} -- {item.petName}</span>
                                <span className="apt-date ml-auto">
                                 <Moment date=
                                 {item.aptDate}
                                 parse="YYYY-MM-dd hh:mm"
                                 format="MMM-D h:mma"
                                 />
                                
                                </span>
                            </div>

                            <div className="owner-name">
                                <span className="label-item">Owner: </span>
                                <span>{item.ownerName}</span>
                            </div>
                            <div className="apt-notes">aptNotes</div>
                            </div>
                        </div>

                ))}
             </div>
            
        )
    }
}

export default ListApointments;
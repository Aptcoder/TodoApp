import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrashAlt, faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import moment from 'moment';

export default class TodoListItem extends React.Component {
    state = {
        open: true
    }
    
    handleEditClick = (e) => {
        e.persist()
        console.log('clicked');
        this.props.editItem(this.props.todo.id)
    }

    openOrCloseItem = (e) => {
        e.persist()
        this.setState((prevState) => {
            return {
                open: !prevState.open
            }
        })
    }

    render(){
        return (
            <div onClick={this.openOrCloseItem} className="todoListItem">
            <div className="todoListItem__top">
            <div className="action">
            <FontAwesomeIcon onClick={this.handleEditClick} icon={faEdit}></FontAwesomeIcon>
            <FontAwesomeIcon onClick={(e) => {
               e.persist()
              console.log('clicked', e);
           }} icon={faTrashAlt}></FontAwesomeIcon>
           <FontAwesomeIcon color={ this.props.todo.isComplete? 'green' : 'red'} icon={faCheckCircle} />
            </div>
            <p className="date">
            {moment(this.props.todo.todoAt).format('ddd. MMM Do YYYY, h:mm a')}
            </p>
            </div>
            <p className="title" style={{'whiteSpace': this.state.open? 'nowrap' : 'normal'}}>{ this.props.todo.title}</p>
            <p className="description" style={{'whiteSpace': this.state.open? 'nowrap' : 'normal'}}>{this.props.todo.description}</p>
            </div>
        )
    }
 
}

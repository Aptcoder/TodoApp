import React from 'react';
import TodoList from './TodoList'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import TodoModal from './TodoModal';

export default class Dashboard extends React.Component {
    state = {
        isTodoModalOpen: false
    }
    handleFabClick = this.handleFabClick.bind(this);
    handleCloseTodoModal = this.handleCloseTodoModal.bind(this)

    handleCloseTodoModal(){
        this.setState(() => {
            return {
                isTodoModalOpen: false
            }
        })
    }

    handleFabClick(){
        console.log('Mo de bi');
        console.log(this)
        this.setState(() => {
            return {
                isTodoModalOpen: true
            }
        })
    }

    render(){
        return (
            <div className="dashboard">
            <TodoModal handleCloseTodoModal={this.handleCloseTodoModal} isOpen={this.state.isTodoModalOpen}/>
            <TodoList/>
            <button onClick={this.handleFabClick} className="fab__button">
                   <FontAwesomeIcon size="1x" icon={faPlus}/>
            </button>
            </div>
        )
    }
}

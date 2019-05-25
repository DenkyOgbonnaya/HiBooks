import React, {Component} from 'react';
import {Button} from 'reactstrap';
import BookForm from './bookform';
class ToggleableBookForm extends Component{

    state= {
        showBookForm: false
    }

    closeBookForm = () => {
        this.setState({showBookForm: false})
    }
    render(){
        return(
            <div> 
                {
                    this.state.showBookForm ?
                    <BookForm closeBookForm = {this.closeBookForm} /> :
                    <Button color='success' onClick = {() => this.setState({showBookForm: true})}> +New Book </Button>
                }
            </div>
        )
    }
}

export default ToggleableBookForm;
import React, {Component} from 'react';
import {Form, Button, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {addCategory, editCategory} from '../../../redux/actions/bookActions';

class CategoryForm extends Component { 
    state = {
        name: this.props.name || ""
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleFormSubmit = (e) => {
        e.preventDefault();

        if(!this.props._id){
            this.props.addCategory(this.state.name)
            return
        }
        this.props.editCategory(this.props._id,  this.state.name)
        this.props.closeForm();

    }
    render(){
        return(
            <div> 
                <Form inline onSubmit ={this.handleFormSubmit} > 
                    <Input name='name' value ={this.state.name} placeholder= 'category name' onChange= {this.handleInputChange} />
                    <Button color='success'> {this.props._id ? 'Save' : 'Add'} </Button>
                </Form>
                <br />
                {this.props._id ? <Button color='warning' onClick = { () => this.props.closeForm()} > Close </Button> : '' }
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addCategory: name => dispatch(addCategory(name)),
        editCategory: (id, name) => dispatch(editCategory(id,name))
    }
}

export default connect(null, mapDispatchToProps)(CategoryForm);
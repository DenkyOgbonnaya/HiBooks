import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button,
        FormFeedback, FormText } from  'reactstrap';
import {connect} from 'react-redux';
import {changePassword} from '../../redux/actions/authActions';

class ChangePassword extends Component{
    state = {
        oldPassword: '',
        newPassword:'',
        confirmPassword: '',
        passwordMatch: false,
        message: ''
    }
    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onBlur = e => {
        const name = e.target.name,
        value = e.target.value;

        switch(name){
            case 'confirmPassword' :
            value == this.state.newPassword
            ?
            this.setState({passwordMatch: true, message: 'match!'})
            :
            this.setState({passwordMatch: false, message: 'didnt match!'})
        }
    }
    handleSubmit = e => {
        const{_id} = this.props.user;
        this.props.changePassword(_id, this.state);
        e.preventDefault();
    }

    render(){
        const inputStyle = {backgroundColor: '#333', borderColor: '#333', color:'#ccc'}
        return(
            <div>
                <h3> Change passsword </h3>
                <Form onSubmit= {this.handleSubmit}> 
                    <FormGroup>
                        <Label for='oldPassword' >Old Password </Label>
                        <Input type='password' name='oldPassword' value={this.state.oldPassword} required
                        onChange ={this.onChange} 
                       style={inputStyle} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='newPassword' >New Password </Label>
                        <Input type='password' name='newPassword' value={this.state.newPassword} required
                        onChange ={this.onChange}
                        style={inputStyle} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='confirmPassword' >Confirm passsword </Label>
                        <Input type='password' name='confirmPassword' value={this.state.confirmPassword} required
                        onChange ={this.onChange}
                        style={inputStyle}
                        onBlur = {this.onBlur}
                        valid = {this.state.passwordMatch} 
                        invalid = {!this.state.passwordMatch} />
                        <FormFeedback valid >{this.state.message} </FormFeedback>
                        <FormFeedback>{this.state.message} </FormFeedback>
                     </FormGroup>
                     <div>{this.props.message} </div>
                     <Button >Submit </Button>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        user: state.auth.currentUser,
        message: state.auth.message
    }
}
const mapDispatchToProps = dispatch => {
    return{
        changePassword: (userId, data) => dispatch(changePassword(userId, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
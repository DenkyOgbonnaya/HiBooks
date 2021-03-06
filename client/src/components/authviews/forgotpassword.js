import React, {Component} from 'react';
import {Form, Input, Button, FormGroup, Label} from 'reactstrap';
import Swal from 'sweetalert';

class ForgotPassword extends Component{
    state = {email: '', message:''}

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        const{email} =  this.state
            fetch(`api/users/${email}/reset`)
            .then(res => {return res.json()})
            .then((data) => {
                if(!data.status === 'success'){
                    this.setState({message: data.message})
                }else
                    Swal(data.message);
            })
            .catch(err => console.log(err))
       
    }
    render(){
        const inputStyle = { backgroundColor: '#333', borderColor: '#333',borderRadius: '10px',color:'#ccc' };
        return(
            <div> 
                <h3>Password recovery </h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup> 
                        <Label for='email' > Enter email </Label>
                        <Input type='email' name='email' value={this.state.email} 
                        placeholder='provide the email address used for registration'
                        onChange={this.handleInputChange} required 
                        style={inputStyle}
                        />
                        <div>{this.state.message} </div>
                        <br />
                        <Button >Submit</Button>
                    </FormGroup>
                </Form>
             </div>
        )
    }
}
export default ForgotPassword;
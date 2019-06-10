import React, {Component} from 'react';
import {Form, Input, Button, FormGroup, Label} from 'reactstrap';
import queryString from 'query-string';

class PasswordReset extends Component{
    state = {password: '', email: '', message:''}

    componentDidMount(){
        const query = queryString.parse(this.props.location.search);

        if(query.email){
            this.setState({email: query.email})
        }
    }
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        const{email, password} =  this.state
            fetch(`api/users/resetPassword`, {
                method: 'PUT',
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({password, email})
            })
            .then(res => {return res.json()})
            .then((data) => {
                if(data.status === 'success'){
                    localStorage.userToken = data.token;
                    this.props.history.push('/');
                }else
                this.setState({message: data.message})
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
                        <Label for='password' > Enter password </Label>
                        <Input type='password' name='password' value={this.state.password} 
                        placeholder='enter new password'
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
export default PasswordReset;
import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

class Contact extends Component { 
    state = {
        name: '',
        email: '',
        message: ''
    }
    handleInputChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        fetch('api/users/contact', {
            method: 'POST',
            headers: {
                'Accept': 'application/jsaon',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.success){
                alert('mail successfully sent')
            }
            else{
                alert('failed to send mail')
            }
        })
        .catch(err => console.log(err));

        
    }

    render(){
        const inputStyle = { backgroundColor: '#333', borderColor: '#333',borderRadius: '10px',color:'#ccc' };
        return(
            <div> 
                <h3> Contact </h3>
        <Form onSubmit ={this.handleSubmit}> 
            <FormGroup>
                <Label for= 'name'>Name</Label>
                <Input type= "text" name="name" required
                    onChange={this.handleInputChange}
                    value= {this.state.name}
                    style= {inputStyle} 
                />
            </FormGroup>
            <FormGroup>
                <Label for='email'>Email</Label> 
                <Input type= "email" name="email"  required
                    onChange={this.handleInputChange}
                    value= {this.state.email}
                    style= {inputStyle} 
                />
            </FormGroup>
                <FormGroup>
                    <Label for='message'>message</Label>
                    <Input type= "textarea" name="message" required
                        onChange={this.handleInputChange}
                        value= {this.state.message}
                        style= {inputStyle}
                    />
            </FormGroup>
            <Button type= "submit" >Send</Button>
        </Form>
    </div>
        )
    }
}

export default Contact;
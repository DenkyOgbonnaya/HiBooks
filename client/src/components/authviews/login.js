import React, {Component} from "react"
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {login} from '../../redux/actions/authActions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component{
        state = {
            name: "",
            password: "",

        }
        
    loginUser = (e)=> {
        this.props.login(this.state);
        this.props.history.push('/');
        e.preventDefault();
    }
    onChange = (e)=> { 
        this.setState({
            [e.target.id]: e.target.value
        })
    }
       
    render(){
        const inputStyle = { backgroundColor: '#333', borderColor: '#333',borderRadius: '10px',color:'#ccc' };
        return(
            <div className= "login"> 
                <Form onSubmit = {this.loginUser}>
                    <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="name" className="mr-sm-2">Username</Label>
                        <Input id="name" placeholder= "username" value= {this.name}  
                        onChange= {this.onChange}
                        style={inputStyle} 
                    />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="pword" className="mr-sm-2">Password</Label>
                        <Input type="password" id="password" placeholder= "password" value= {this.pword}  
                            onChange= {this.onChange} 
                            style={inputStyle} 
                        />
                    </FormGroup>
                    <div> {this.props.message} </div>
                    <br />
                    <Button>Login</Button>{' '}
                    <Link to='/forgotPassword' > Forgot your password..? </Link>
                </Form>
            </div>
            
        )
    }
}
const mapStateToProps = state => {
    return{
        message: state.auth.message
    }
}
const mapDispatchToProps = dispatch => {
    return{
      login: (user)=>{
        
           dispatch(login(user))}
    }
  }   
export default connect(mapStateToProps, mapDispatchToProps)(Login);
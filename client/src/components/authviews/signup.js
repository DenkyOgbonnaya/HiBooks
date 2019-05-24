import React, {Component} from "react";
import {connect} from 'react-redux';
import {signUp, userNameExist, emailExist} from '../../redux/actions/authActions';
import {Form, FormGroup, Label, Input, Button, FormText, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../../styles/authviews.css'

class SignUp extends Component{
        state ={
                name: "",
                location: "",
                email: "",
                password: "",
                nameExist: false,
                emailExist: false,
                emailError: "",
                nameError :"",
                locError: "",
                passwordError: "",
                nameMessage: "",
                emailMessage: ""
            }
    handleSignup = (e)=> {
        this.props.signUp(this.state);
        this.props.history.push('/')
        e.preventDefault();
        
    }
    handleInputChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onFocus = e => {
        let name = e.target.name;
        switch(name){
            case 'name' :
                this.setState({
                    nameError: '',
                    nameMessage: ''
                })
            break;
            case 'location' :
                this.setState({
                    locError: ''
                })
            break;
            case 'email' :
                this.setState({
                    emailError: '',
                    emailMessage: ''
                })
            break;
            case 'password' :
                this.setState({
                    passwordError: ''
                })
            break;
            default: this.setState({passwordError:''})
        }

        
        
    }
    onBlur = e => {
        let value = e.target.value;

        switch(e.target.name){
            case 'location' : 
                if(value.length < 4 || !value){
                    this.setState({locError: 'location must be a minimumof 4 letters'})
                }
            break
            case 'name' :
                if(value.length < 5 || !value){
                    this.setState({nameError: 'Name must be minimum of 5 characters'})
                }else{
                    userNameExist(value)
                    .then(res =>{ if(res.status === 200) return res.json()})
                    .then(data => {data.userNameExist
                        ? 
                        this.setState({nameExist: data.userNameExist, nameMessage: data.message})
                        :
                        this.setState({nameExist: data.userNameExist, nameMessage: data.message}) })
                    .catch(err => console.log(err))
                }
    
            break;
            
            case 'email' :
                if(!/\S+@\S+\.\S+/.test(value)){
                    this.setState({emailError: 'provide a valid email address'})
                }else{
                    emailExist(value)
                    .then(res =>{ if(res.status === 200) return res.json()})
                    .then(data => {data.emailExist
                        ? 
                        this.setState({emailExist: data.emailExist, emailMessage: data.message})
                        :
                        this.setState({emailExist: data.emailExist, emailMessage: data.message}) })
                    .catch(err => console.log(err))
                }
            break;
            case 'password' :
                if(value.length < 8 || !value){
                    this.setState({passwordError: 'password must be minimum of 8 characters'})
                }
            break;
            default : return null
        
        }
    }
    render(){
        const inputStyle = { backgroundColor: '#333', borderColor: '#333',borderRadius: '10px',color:'#ccc' };
        return(
            <div className= 'authForm'> 
            <hr />
                <div className='form'> 
                <h5> Create an account </h5>
                    <Form onSubmit ={this.handleSignup}> 
                        <FormGroup>
                            <Label for='name'>Name</Label>
                            <Input  type= "text" name="name" placeholder= "Enter name" 
                            valid={!this.state.nameExist}
                            invalid={this.state.nameExist}
                            onChange={this.handleInputChange}
                            value= {this.state.name}
                            onFocus= {this.onFocus}
                            onBlur= {this.onBlur}
                            style= {inputStyle}/>
                            <FormText> {this.state.nameError}</FormText>
                            <FormFeedback valid > {this.state.nameMessage} </FormFeedback>
                            <FormFeedback > {this.state.nameMessage} </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for= 'location'>Location</Label>
                            <Input type= "text" name="location" placeholder= "Enter your location" 
                            onChange={this.handleInputChange}
                            onFocus = {this.onFocus}
                            value= {this.state.location}
                            onBlur = {this.onBlur}
                            style= {inputStyle}
                            />
                            <FormText> {this.state.locError}</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for='email'>Email</Label> 
                            <Input type= "email" name="email" placeholder= "Enter email" 
                            valid={!this.state.emailExist}
                            invalid={this.state.emailExist}
                            onChange={this.handleInputChange}
                            onFocus = {this.onFocus}
                            value= {this.state.email}
                            onBlur= {this.onBlur}
                            style= {inputStyle}
                            />
                            <FormText> {this.state.emailError}</FormText>
                            <FormFeedback valid >{this.state.emailMessage} </FormFeedback>
                            <FormFeedback > {this.state.emailMessage} </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for='password'>Password</Label>
                            <Input type= "password" name="password" placeholder= "Enter password" 
                            onChange={this.handleInputChange}
                            onFocus = {this.onFocus}
                            value= {this.state.password}
                            onBlur= {this.onBlur}
                            style= {inputStyle}
                            />
                            <FormText> {this.state.passwordError}</FormText>
                        </FormGroup>
                        <Button type= "submit" >Create account</Button>
                    </Form>
                    <p>Already has an account? <Link to="/login" style= {{color: "steelblue"}}> Login instead </Link></p>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch)=> {
    return{
      signUp: user => dispatch(signUp(user)),
    }
  }             

export default connect(null, mapDispatchToProps)(SignUp);
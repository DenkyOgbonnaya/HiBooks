import React, {Component} from "react";
import {connect} from 'react-redux';
import {Container, Row, Col, Button, Table, Input, FormText, FormFeedback,
        Card,CardBody, CardSubtitle , CardTitle, CardText
        } from 'reactstrap';
import {Link} from 'react-router-dom';
import {returnBook, rentedBooks} from '../redux/actions/bookActions';
import {userNameExist, emailExist, editProfile}from '../redux/actions/authActions';
import ChangePassword from "./authviews/changepassword";

class UserProfile extends Component{
    state ={
        name: this.props.user.name || "",
        location: this.props.user.location,
        email: this.props.user.email,
        plan: this.props.user.plan,
        isDisabled: true,
        nameExist: true,
        emailExist: false,
        emailError: "",
        nameError :"",
        locError: "",
        passwordError: "",
        nameMessage: "",
        emailMessage: "",
        button: 'Edit profile'
    }
    componentDidMount(){
        this.props.getRentedBooks(this.props.user.name);
    }
    returnBook = (record) => {
        this.props.returnBook(record.book.ISBN, record.borrower)
    }
    
    editProfile = () => {
        if(this.state.button == 'Edit profile'){
            this.setState({isDisabled: false})
            this.setState({button: 'Save changes'})
        }else{
            const{name, location, email} = this.state;
            const newData = {
                name,
                location,
                email
            }
            this.props.editProfile(this.props.user._id, newData);
            this.setState({isDisabled: true})
            this.setState({button: 'Edit profile'})
        }
        
    }
    handleInputChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onFocus = e => {
        let name = e.target.name;
        let value = e.target.value

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
           
        } 
    }
    onBlur = e => {
        let name = e.target.name;
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
                    .then(res =>{ if(res.status ==200) return res.json()})
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
                    .then(res =>{ if(res.status ==200) return res.json()})
                    .then(data => {data.emailExist
                        ? 
                        this.setState({emailExist: data.emailExist, emailMessage: data.message})
                        :
                        this.setState({emailExist: data.emailExist, emailMessage: data.message}) })
                    .catch(err => console.log(err))
                }
            break;
            
            default : return null
        
        }
    }
    
    render(){
        const inputStyle= { backgroundColor: '#333', color: '#ccc',borderRadius: '10px',borderColor:'#333' }
        return(
            <div>
                <h3  style={{border:'2px solid #333', background:'#212121', height:'40px'}}> User Profile </h3>
            <Container> 
                <hr />
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <div style ={{textAlign: 'center'}}> 
                            <img src='/images/icons/user.png' />
                            <p>{this.props.user.name} </p>
                        </div>
                    </Col>
                </Row>
                <Row>
          <Col sm={{ size: 'auto', offset: 4 }}> 
          <div> 
    <Table >
        <tbody>
          <tr>
            <td> Name</td>
            <td>
            <Input  type= "text" name="name" placeholder= "Enter name" 
                        disabled= {this.state.isDisabled}
                        onChange={this.handleInputChange}
                        value= {this.state.name}
                        onFocus= {this.onFocus}
                        onBlur= {this.onBlur}
                        style={inputStyle}/>
                        <FormText> {this.state.nameError}</FormText>
                        <FormText  > {this.state.nameMessage} </FormText>
            </td>
          </tr>
          <tr>
            <td>Location</td>
            <td>
            <Input type= "text" name="location" placeholder= "Enter your location"
                         disabled= {this.state.isDisabled}
                        onChange={this.handleInputChange}
                        onFocus = {this.onFocus}
                        value= {this.state.location}
                        onBlur = {this.onBlur}
                        style={inputStyle}/>
                        <FormText> {this.state.locError}</FormText>
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
            <Input type= "email" name="email" placeholder= "Enter email" 
                        disabled= {this.state.isDisabled}
                        onChange={this.handleInputChange}
                        onFocus = {this.onFocus}
                        value= {this.state.email}
                        onBlur= {this.onBlur}
                        style={inputStyle}/>
                        <FormText> {this.state.emailError}</FormText>
                        <FormText  >{this.state.emailMessage} </FormText>
            </td>
          </tr>
          <tr>
            <td>Subscribed plan</td>
            <td>{this.state.plan} </td>
          </tr>
        </tbody>
      </Table>
      <Button onClick={this.editProfile} >{this.state.button} </Button>
      <Link to={ `${this.props.user.name}/changePassword`} style={{color:'#ccc'}}> Change password </Link>
      <hr/>
    </div>
           </Col>
    </Row>
    
          <BorrowedBooks list= {this.props.rentedBooks} returnBook = {this.returnBook}/>
          </Container>
    
        
    </div> 
        )
    }
}
    const BorrowedBooks = ({list, returnBook})=>
        <div>
            <h4> Your borrowed Books </h4>
            {
              list.length == 0 
              ?
              <div> You have no borrowedBooks</div>
              :
            <Row>
            {list.map(record=>
            
                <Col xs="12"  sm="12" md="3" key={record._id}>
                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                        <CardBody >
                            <CardTitle> {record.book.title} </CardTitle>
                            <CardText> {record.book.author} </CardText>
                            <CardText> 
                                <small className='text-muted'> Expexted Return: {record.expectedReturnDate} </small>
                            </CardText>
                            <Button style= {{float:"right", marginBottom:"1px"}} onClick= {(e)=> {returnBook(record)} }> Return </Button>
                         </CardBody>
                     </Card>
                     <br />
                </Col> 
    
            )}
            </Row>
                
            }
        </div>
    
    const mapStateToProps = (state)=> {
        return{
            user: state.auth.currentUser,
            rentedBooks: state.books.rentedBooks
        }
    } 
    const mapDispatchToProps = dispatch => {
        return {
            returnBook: (bookISBN, userId) => dispatch(returnBook(bookISBN, userId)),
            getRentedBooks: userName => dispatch(rentedBooks(userName)),
            editProfile: (userid, newData) => dispatch(editProfile(userid, newData))
        }
    }  

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
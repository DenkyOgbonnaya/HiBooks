import React from "react";
import {addBook, modifyBook} from '../../redux/actions/bookActions';
import actionType from '../../redux/actions/actionType';
import {connect} from 'react-redux';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddBook extends React.Component {
  state = {
    title: '',
    author: '',
    publishedYear: '',
    pages: '',
    quantity: '',
    language: '',
    ISBN : '',
    category : '',
    about : ''
  }
  
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleOnSubmit = (e) => {
    e.preventDefault();
    
    switch(this.props.action){
      case 'EDIT_BOOK' :
        const _id = this.props._id
        this.props.modifyBook(_id, this.state);
        this.props.toggleRenderAddBooks();
        break;
      case 'ADD_BOOK' :
        this.props.addBook(this.state);
      break;
      default : return
    }  
  }
  componentDidMount(){
    this.setState(this.props.newState)
  }
  render() {
    const inputStyle = {backgroundColor: '#333', borderColor: '#333', color:'#ccc'}
    return (
    <div>
        <hr />
        <h4> {this.props.action} </h4>
      <Form onSubmit = {this.handleOnSubmit} >
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input style={inputStyle} type="text" name="title" id="title" placeholder="enter books title" 
                    value= {this.state.title} onChange= {this.handleInputChange} required />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input style={inputStyle} type="text" name="author" id="author" placeholder="books author" 
                      value= {this.state.author} onChange= {this.handleInputChange} required />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
          <FormGroup>
              <Label for="publishedYear">Published year</Label>
              <Input style={inputStyle} type="text" name="publishedYear" id="publishedYear" placeholder="published year" 
                      value= {this.state.publishedYear} onChange= {this.handleInputChange} required />
            </FormGroup>
          </Col>
          <Col md={4}>
          <FormGroup>
              <Label for="pages">Pages</Label>
              <Input style={inputStyle} type="text" name="pages" id="pages" placeholder="number of pages" 
                      value= {this.state.pages} onChange= {this.handleInputChange} required />
            </FormGroup>
          </Col>
          <Col md={2}>
          <FormGroup>
              <Label for="quantity">Quantity</Label>
              <Input style={inputStyle} type="text" name="quantity" id="quantity" placeholder="number of copies" 
                      value= {this.state.quantity} onChange= {this.handleInputChange} required />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="language">Language</Label>
              <Input style={inputStyle} type="text" name="language" id="language" value= {this.state.language} 
                    onChange= {this.handleInputChange} required />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="ISBN">ISBN</Label>
              <Input style={inputStyle} type="text" name="ISBN" id="ISBN" value= {this.state.ISBN} 
              onChange= {this.handleInputChange} required />
            </FormGroup>
          </Col>
          <Col md={2}>
          <FormGroup>
          <Label for="category">Category</Label>
          <Input style={inputStyle} type="text" name="category" id="category" value= {this.state.Category} 
          onChange= {this.handleInputChange} required />
        </FormGroup>  
          </Col>
        </Row>
        <FormGroup>
          <Label for="about">About book</Label>
          <Input style={inputStyle} type="textarea" name="about" id="about" placeholder='a brief description about the book'
                   value= {this.state.About} onChange= {this.handleInputChange} required />
        </FormGroup>
        <Button>{this.props.action}</Button>
      </Form>
    </div>
    );
  }
}
const mapDispatchToProps = dispactch => {
  return{
    addBook: book => dispactch(addBook(book)),
    modifyBook: (_id, newData) => dispactch(modifyBook(_id, newData)),
    toggleRenderAddBooks: () => dispactch({type: actionType.TOGGLE_RENDER_ADD_BOOK})
  }
}
export default connect(null, mapDispatchToProps)(AddBook)
import React, {Component} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from 'react-redux';
import {addBook, editBook, getCategories} from '../../../redux/actions/bookActions'

class BookForm extends Component{
    state = {
        title: this.props.title || '',
        author: this.props.author ||'',
        publishedYear: this.props.publishedYear || '',
        pages: this.props.pages || '',
        quantity: this.props.quantity || '',
        language: this.props.language || '',
        isbn : this.props.isbn || '',
        category: this.props.category || '',
        about: this.props.about || '',
        image: this.props.cover || null
      }
  
      componentDidMount(){
        this.bookData = new FormData();
        this.props.getCategories();
      }
      
      handleInputChange = (e) => {
        let name = e.target.name;
        let value = name === 'image' ? e.target.files[0] : e.target.value

        this.bookData.set(name, value)
        this.setState({
          [name]: value
        })
      }
      handleOnSubmit = (e) => {
        e.preventDefault();

        if(!this.props._id){
          this.props.addBook(this.bookData);
          this.props.closeBookForm();
        }else
        this.props.editBook(this.props._id, this.state);
        this.props.closeBookForm()
      }

    render(){
        const inputStyle = {backgroundColor: '#333', borderColor: '#333', color:'#ccc'}
    return (
    <div>
        <hr />
        <h4> {this.props.action} </h4>
      <Form onSubmit = {this.handleOnSubmit}  encType = "multipart/form-data" >
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
              <Input style={inputStyle} type="text" name="isbn" id="isbn" value= {this.state.ISBN} 
              onChange= {this.handleInputChange} required />
            </FormGroup>
          </Col>
          <Col md={2}>
          <FormGroup>
          <Label for="category">Category</Label>
          <Input style={inputStyle} type="select" name="category" id="category" value= {this.state.category} 
          onChange= {this.handleInputChange} required > 
          {
            this.props.categories.map(category => 
              <option key = {category._id}>{category.name} </option>
            )
          }
          </Input>
        </FormGroup>  
          </Col>
        </Row>
        <FormGroup>
          <Label for="about">About book</Label>
          <Input style={inputStyle} type="textarea" name="about" id="about" placeholder='a brief description about the book'
                   value= {this.state.about} onChange= {this.handleInputChange} required />
        </FormGroup>
        <FormGroup> 
        <Label for="cover">select cover</Label>
        <Input type='file' name="image" accept='image/*' onChange ={ this.handleInputChange} disabled = {this.props._id ? true : false}  />
        </FormGroup>
        <Button>{this.props._id ? 'Save' : 'Add'}</Button>
      </Form>
      <br />
      <Button color = 'warning' onClick ={() => this.props.closeBookForm()}>Cancel </Button>
    </div>
    );
    }
}
const mapStateToProps = state => {
  return{
      categories: state.books.categories,
  }
}
const mapDispatchToProps = dispatch => {
  return {
      addBook: book => dispatch(addBook(book)),
      editBook: (id, credentials) => dispatch(editBook(id, credentials)),
      getCategories: () => dispatch(getCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
import React, {Component} from 'react';
import {Card,CardBody, CardTitle, CardText, Form, Input, Button,
    Container, Row, Col, FormText, FormGroup
    } from 'reactstrap';

class ManageUsers extends Component {
    state = {
        userName: '',
        rentedBooks: [],
        error: ''
    }

    onChange = e => {
        this.setState({
            userName: e.target.value
        })
    }
    handleSubmit = (e) => {
        if(this.state.userName === ''){
            this.setState({error: 'This field can not be left blank'})
        }else{

        fetch(`api/books/rentedBooks/${this.state.userName}`)
        .then(res => {
            if(res.status === 200)
                return res.json()
        })
        .then(books => {
            this.setState({
                rentedBooks: books,
                error:''
            })
        })
        .catch(err => console.log(err))

        e.preventDefault();
    }
    }
    render(){
        const{rentedBooks} = this.state;
        const inputStyle= { backgroundColor: '#333', color: '#ccc',borderRadius: '10px',borderColor:'#333' }
        return(
            <div>
                <Form > 
                    <FormGroup>
                        <Input name='userName' value= {this.state.userName} required
                        placeholder='Enter a user name '
                        onChange= {this.onChange} 
                        style= {inputStyle}/>
                        <FormText style= {{color: 'red'}}>{this.state.error} </FormText>
                        <Button onClick={this.handleSubmit} > Search </Button>
                    </FormGroup>
                </Form>
            <hr />
            <h4> Users borrowed Books </h4>
            {
              rentedBooks.length === 0
              ?
              <div> This user has no borrowed Books</div>
              :
            <Container>
            <Row>
            {rentedBooks.map(record=>
            
                <Col xs="12"  sm="12" md="3" key={record._id}>
                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                        <CardBody >
                            <CardTitle> {record.book.title} </CardTitle>
                            <CardText> {record.book.author} </CardText>
                            <CardText> 
                                <small className='text-muted'> Expexted Return: {record.expectedReturnDate} </small>
                            </CardText>
                         </CardBody>
                     </Card>
                     <br />
                </Col> 
            )}
            </Row>
            </Container>
                
            }
             
            </
            div>
        )
    }
}

export default ManageUsers;
import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import Book from './book';

class BookList extends Component {
    
    render(){
        const {books} = this.props;
        if(books.length > 0)
        return(
            <div> 
                <Container> 
                    <Row> 
                        {
                            books.map(book => 
                                <Col md='3' key = {book._id} >
                                    <Book  book = {book} />
                                    <br />
                                </Col>
                            )
                        }
                    </Row>
                </Container>
            </div>
        )
        return(
            <div>No books in the library </div>
        )
    }
}

export default BookList;
import React, {Component} from 'react';
import {Container, Row, Col, Card,CardBody, CardImg, CardSubtitle , CardTitle, CardText, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {returnBook, rentedBooks} from '../../redux/actions/bookActions';

class RentedBooks extends Component {

    componentDidMount(){
        this.props.getRentedBooks(this.props.user._id);
    }
    returnBook = (bookId) => {
        this.props.returnBook(bookId, this.props.user._id)
    }
    render(){
        const{rentedBooks} = this.props;
        return(
            <div> 
                <h4> Your borrowed Books </h4>
                {
                rentedBooks.length == 0 
                ?
                <div> You have no borrowedBooks</div>
                :
                    <Container> 
                        <Row>
                            {rentedBooks.map(record=>
            
                                <Col xs="12"  sm="12" md="3" key={record._id}>
                                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333', height: '400px' }}>
                                        <CardImg height='150px' width='100%' src={record.book.cover} />
                                        <CardBody >
                                            <CardTitle> {record.book.title} </CardTitle>
                                            <CardText> {record.book.author} </CardText>
                                            <CardText> 
                                                <small className='text-muted'> Expexted Return: {record.expectedReturn} </small>
                                            </CardText>
                                            <Button style= {{float:"right", marginBottom:"1px"}} onClick= {(e)=> this.returnBook(record.book._id) }> Return </Button>
                                        </CardBody>
                                    </Card>
                                    <br />
                                </Col> 
    
                            )}
                        </Row>
                    </Container>
            
                
                }
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return{
        user: state.auth.currentUser,
        rentedBooks: state.books.rentedBooks
    }
} 
const mapDispatchToProps = dispatch => {
    return {
        returnBook: (bookId, userId) => dispatch(returnBook(bookId, userId)),
        getRentedBooks: userId => dispatch(rentedBooks(userId))
    }
}  
export default connect(mapStateToProps, mapDispatchToProps)(RentedBooks);
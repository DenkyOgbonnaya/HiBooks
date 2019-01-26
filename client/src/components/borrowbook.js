import React, {Component} from "react";
import {connect} from 'react-redux';
import {Card, CardBody, CardSubtitle , CardTitle, CardText, Container, Row,Col,
      Button} from 'reactstrap';
import {rentBook, getAvailableBooks} from '../redux/actions/bookActions';
import SearchField from './searchfield';
import hasBook from './utils/filterhoc';
 
class BorrowBook extends Component{
    state ={searchedTerm: ''}

    componentDidMount(){
        this.props.getAvailableBooks()
    }
    rentBooks = (userId, bookId) => {
        this.props.rentBook(userId, bookId)
    }
    onChange = e => {
        this.setState({searchedTerm: e.target.value})
    }
        
    render(){
        const{availableBooks} = this.props;
        if(availableBooks)
        return(
            <div > 
                <SearchField value= {this.searchedTerm} onChange= {this.onChange} />
                <br />
                <Container>
                    <Row>    
                        {availableBooks.filter(hasBook(this.state.searchedTerm)).map(book =>
                            <Col sm="12" md="3" key={book._id}>
                                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                    <CardBody> 
                                        <CardTitle> {book.title} </CardTitle>
                                        <CardText> {book.author}  </CardText>
                                        <CardText>
                                            <small className="text-muted">
                                                <span> published: {book.publishedYear } </span>
                                                <span> Pages: {book.pages} </span>
                                            </small>
                                        </CardText>
                                        <Button style= {{float:"right", marginBottom:"1px"}} onClick= {(e)=> {this.rentBooks(this.props.user._id, book._id); e.target.disabled = true;} }> Borrow </Button>
                                    </CardBody>
                                </Card>
                                <br />
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
        )
        return(
            <div> 
                <h3 style={{border:'2px solid #333', background:'#212121', height:'40px'}} >Available Books </h3>
                <div>There is currently no available book in the library </div>
            </div>
        )
    }
   
}

const mapStateToProps = (state)=> {
    return{
        user: state.auth.currentUser,
        availableBooks: state.books.availableBooks
    }
}
const mapDispatchToProps = dispatch => {
    return {
        rentBook: (userId, bookId) => dispatch(rentBook(userId, bookId)),
        getAvailableBooks: () => dispatch(getAvailableBooks())
    }
}   

export default connect(mapStateToProps, mapDispatchToProps)(BorrowBook);
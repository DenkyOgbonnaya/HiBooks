import React, {Component} from 'react';
import {Card, CardImg, CardTitle, CardText, CardBody, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {rentBook} from '../../redux/actions/bookActions';

class Book extends Component {

    rentBook = (bookId) => {
        const{user} = this.props;
        this.props.rentBook(user._id, bookId);
    }
    render(){
        const book = this.props.book;
        return(
            <div> 
                <Card color='primary' style = {{height: '350px'}}> 
                    <CardImg top width="100%" height="150px" src={book.cover} alt='book cover' />
                     
                        <CardBody style = {{background: '#333'}}> 
                            <CardTitle> {book.title} </CardTitle>
                            <CardText>
                                <small className="text-muted">
                                    {book.author} {book.publishedYear}
                                </small>
                            </CardText>
                            <Button onClick = { () => this.rentBook(book._id)}> Rent </Button>
                        </CardBody>
                </Card>
            </div>
        )
    }
}
const mapStateToProps = (state)=> {
    return{
        user: state.auth.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        rentBook: (userId, bookId) => dispatch(rentBook(userId, bookId))
    }
}   

export default connect(mapStateToProps, mapDispatchToProps)(Book);
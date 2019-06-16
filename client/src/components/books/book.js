import React, {Component} from 'react';
import {Card, CardImg, CardTitle, CardText, CardBody, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {rentBook} from '../../redux/actions/bookActions';
import {withRouter} from 'react-router-dom';

class Book extends Component {

    rentBook = (e, bookId) => {
        const{user} = this.props;
        this.props.rentBook(user._id, bookId);

        e.stopPropagation();
    }
    render(){
        const book = this.props.book;
        return(
            <div> 
                <Card color='primary' style = {{height: '400px', cursor: 'pointer'}} onClick= {() => this.props.history.push(`/books/${book._id}`)} > 
                    <CardImg top width="100%" height="150px" src={book.cover} alt='book cover' />
                     
                        <CardBody style = {{background: '#333'}}> 
                            <CardTitle> {book.title} </CardTitle>
                            <CardText>
                                <small className="text-muted">
                                    {book.author} {book.publishedYear}
                                </small>
                            </CardText>
                            {book.quantity < 1 ? <span>Out of stock! </span> :
                            <Button onClick = { (e) => this.rentBook(e,book._id) }> Rent </Button>
                            }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Book));
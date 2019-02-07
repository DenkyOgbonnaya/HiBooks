import React, {Component} from "react";
import SearchField from './searchfield';
import hasBook from './utils/filterhoc';
import swal from 'sweetalert';
import { 
    Card, CardImg, CardText, CardBody, Pagination, PaginationItem, PaginationLink,
    CardTitle, CardSubtitle, Button, ButtonGroup,Container, Row,Col
    } from 'reactstrap';
import AddBook from './adminViews/addBooks'
import {connect} from 'react-redux';
import {getAllBooks, deleteBook} from '../redux/actions/bookActions';
import actionType from '../redux/actions/actionType';

class AllBooks extends Component{
        state= {
            book: {},
            currentPage: 1,
            booksPerPage: 3,
            searchedTerm: ''
        }
        topRef = React.createRef();
    
    componentDidMount(){
        this.props.getAllBooks();
    }

    deleteBook = _id => {
        swal({
            title:'Delete Book',
            text: 'Sure to delete',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        })
        .then(willDelete => {
            if(willDelete){
                this.props.deleteBook(_id)
                swal({
                    title:'Delete Book',
                    text: 'Book deleted',
                    icon: 'success'
                })
            }
        })
        
    }
    renderAddBooks = () => {
        if(this.props.renderAddBooks)
            return <AddBook newState = {this.state.book} _id= {this.state.book._id} action= 'EDIT_BOOK'/>

    }
    modifyBook = book => {
        this.setState({
            book: book,
        });
        this.props.toggleRenderAddBooks();
        window.scrollTo(0, this.topRef.current.offsetTop);
    }
    handleClick = event => {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }
    onChange = e => {
        this.setState({searchedTerm: e.target.value});
    }
    displayBooks = () => {
        const {currentPage, booksPerPage } = this.state;
        const{allBooks} = this.props;

        const indexOfLastBook = currentPage * booksPerPage;
        const indexOfFirstBook = indexOfLastBook - booksPerPage;
        const currentBooks = allBooks.filter(hasBook(this.state.searchedTerm)).slice(indexOfFirstBook, indexOfLastBook);

        return currentBooks.map(book => {
            return <div key={book._id} >
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <Row> 
                        <Col sm="1" md={{ size: 2 }}>
                            <CardImg src='images/cover.jpg' />
                        </Col >
                        <Col sm="8" md={{ size: 7 }}>
                            <CardBody>
                                <CardTitle>{book.title}</CardTitle>
                                <CardSubtitle>{book.author}</CardSubtitle>
                                <CardText> 
                                    <small className="text-muted">{book.about}</small>
                                </CardText>
                                { 
                                this.props.showButtonGroup 
                                ?
                                <ButtonGroup> 
                                    <Button onClick= { () =>this.modifyBook(book)}> modify </Button>
                                    <Button onClick= { () =>this.deleteBook(book._id)}> Delete </Button>
                                </ButtonGroup>
                                :
                                null
                                }
                            </CardBody>
                        </Col >
                    </Row>
                                
                </Card>
                <br />
            </div>
        });
    }

    displayPageNums = () => {
        const {booksPerPage } = this.state;
        const{allBooks} = this.props;
        const pageNumbers = [];


        for (let i = 1; i <= Math.ceil(allBooks.length / booksPerPage); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map(number => {
            return (
                <PaginationItem key={number}>
                <PaginationLink onClick={this.handleClick} id={number} className='navLink'
                    style={{ backgroundColor: '#333', borderColor: '#212121', color:'#ccc' }} >
                    {number}
                </PaginationLink>
                </PaginationItem>
            );
        });
    }
    
    render(){
        
        if(this.props.bookCounter === 0)
            return(
            <div>There is currently no book in the library </div>
            )
        return(
            <div ref= {this.topRef}>
                {this.renderAddBooks()}
                <SearchField value= {this.state.searchedTerm} onChange= {this.onChange} />
                <br/>
                <div style={{border: "1px solid grey"}}> <span style={{color: 'white'}}>All books </span>
                  <span style= {{float: "right", color: 'white'}}>{this.props.allBooks.length}</span></div>
                <br />
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 7, offset: 2 }}>
                            <div style ={{textAlign: 'center'}}> 
                            {
                            this.displayBooks()
                            }
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Pagination>
                    <PaginationItem>
                        <PaginationLink previous onClick={this.handleClick} 
                            style={{ backgroundColor: '#333', borderColor: '#212121', color:'#ccc' }} />
                    </PaginationItem>
                        {this.displayPageNums()}
                    <PaginationItem>
                        <PaginationLink next href="#" 
                            style={{ backgroundColor: '#333', borderColor: '#212121', color:'#ccc' }}/>
                    </PaginationItem>
                </Pagination>
                

            </div>
        )
    }
}

    const mapStateToProps = state => {
        return{
            user: state.auth.currentUser,
            allBooks: state.books.allBooks,
            showButtonGroup: state.auth.showButtonGroup,
            renderAddBooks: state.books.renderAddBooks
        }
    }
    const mapDispatchToprops = dispatch => {
        return{
            getAllBooks: () => dispatch(getAllBooks()),
            deleteBook: _id => dispatch(deleteBook(_id)),
            toggleRenderAddBooks: () => dispatch({type: actionType.TOGGLE_RENDER_ADD_BOOK})
        }
    }   

export default connect(mapStateToProps, mapDispatchToprops)(AllBooks);
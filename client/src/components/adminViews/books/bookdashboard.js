import React, {Component} from 'react';
import ToggleableBookForm from './toggleableform';
import EditableBookList from './editableBookList';
import {connect} from 'react-redux';
import {getAllBooks} from '../../../redux/actions/bookActions';
import actionType from '../../../redux/actions/actionType';
import Spinnar from '../../utils/spinner';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

class BookDashboard extends Component{

    componentDidMount(){
        this.props.getAllBooks(1, 20);
        if(this.props.allBooks.length > 0)
            this.props.toggleSpinner();
    }
    handlePageChange = (pageNum) => {
        this.props.getAllBooks(pageNum, 20)
    }
    displayPageNums = () => {
        const pageNumbers = [];
        const{pages, currentPage} = this.props;

        for(let number = 1; number <= pages; number++){
            pageNumbers.push(number);
        }
        if(pages > 1)
        return (
            <Pagination >
                <PaginationItem  disabled = {currentPage === 1 ? true : false }> 
                    <PaginationLink previous onClick = { () => this.handlePageChange(currentPage -1)} />
                </PaginationItem>
                {pageNumbers.map(number =>
                <PaginationItem key = {number} active = {currentPage === number ? true : false}  >
                    <PaginationLink  
                    onClick = { ()=> this.handlePageChange(number)}>   {number}  
                    </PaginationLink>
                </PaginationItem>
                )}
                <PaginationItem disabled = {currentPage > 1 ? true : false } > 
                    <PaginationLink next onClick = { () => this.handlePageChange(currentPage +1)} />
                </PaginationItem>
            </Pagination>
        )
    }
    render(){
        const books = this.props.allBooks;
        return(
            <div> 
                <h3>Manage Books </h3>
                <ToggleableBookForm />
                <hr />
                <h5> Existing </h5>
                {
                    this.props.isLoading ? <Spinnar /> :
                <EditableBookList books = {books}  />
                }
                {this.displayPageNums()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        allBooks: state.books.allBooks,
        isLoading: state.books.isLoading,
        currentPage: state.books.currentPage,
        pages: state.books.pages
    }
}
const mapDispatchToprops = dispatch => {
    return{
        getAllBooks: (pageNum, limit) => dispatch(getAllBooks(pageNum, limit)),
        toggleSpinner: () => dispatch({type: actionType.TOGGLE_SPINNER})
    }
}   

export default connect(mapStateToProps, mapDispatchToprops)(BookDashboard);
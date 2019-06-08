import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchField from '../searchfield';
import {getAllBooks} from '../../redux/actions/bookActions';
import BookList from './bookList';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

class DashBoard extends Component {
    
    componentDidMount(){
        this.props.getAllBooks(1, 20);
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
        const{allBooks} = this.props;
        return(
            <div> 
                <SearchField />
                <br />
                <BookList books = {allBooks} />
                {this.displayPageNums()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        allBooks: state.books.allBooks,
        currentPage: state.books.currentPage,
        pages: state.books.pages
    }
}
const mapDispatchToprops = dispatch => {
    return{
        getAllBooks: (pageNum, limit) => dispatch(getAllBooks(pageNum, limit))
    }
}   

export default  connect(mapStateToProps, mapDispatchToprops)(DashBoard);
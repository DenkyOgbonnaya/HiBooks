import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchField from '../includes/searchfield';
import {getAllBooks, getCategories, searchBook} from '../../redux/actions/bookActions';
import BookList from './bookList';
import Spinnar from '../utils/spinner';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

class DashBoard extends Component {
    state = {
        search: '',
        category: 'All'
    }
    componentDidMount(){
        this.props.getAllBooks(1, 20);
        this.props.getCategories();
    }
    setSearch = search => {
        this.setState({
            search
        })
    }
    setCategory = category => {
        this.setState({
            category
        })
    }
    handleSearch = (search= this.state.search, category= this.state.category) => {
        this.props.searchBook(search, category)
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
                <SearchField
                    categories = {this.props.categories}
                    setSearch = {this.setSearch}
                    setCategory = {this.setCategory}
                    handleSearch = {this.handleSearch}
                 />
                <br />
                {
                    this.props.isLoading ? <Spinnar /> :
                    <BookList books = {allBooks} />
                }
                {this.displayPageNums()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        allBooks: state.books.allBooks,
        categories: state.books.categories,
        currentPage: state.books.currentPage,
        pages: state.books.pages,
        isLoading: state.books.isLoading
    }
}
const mapDispatchToprops = dispatch => {
    return{
        getAllBooks: (pageNum, limit) => dispatch(getAllBooks(pageNum, limit)),
        searchBook: (search, category) => dispatch(searchBook(search, category)),
        getCategories: () => dispatch(getCategories())
    }
}   

export default  connect(mapStateToProps, mapDispatchToprops)(DashBoard);
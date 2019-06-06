import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchField from '../searchfield';
import {getAllBooks} from '../../redux/actions/bookActions';
import BookList from './bookList';

class DashBoard extends Component {
    
    componentDidMount(){
        this.props.getAllBooks();
    }

    render(){
        const{allBooks} = this.props;
        return(
            <div> 
                <SearchField />
                <br />
                <BookList books = {allBooks} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        allBooks: state.books.allBooks,
    }
}
const mapDispatchToprops = dispatch => {
    return{
        getAllBooks: () => dispatch(getAllBooks())
    }
}   

export default  connect(mapStateToProps, mapDispatchToprops)(DashBoard);
import React, {Component} from 'react';

class Book extends Component{

    render(){
        const{book} = this.props;
        return(
            <div> 
                <td> {book.title} </td>
                <td> {book.author} </td>
            </div>
        )
    }
}
export default Book;
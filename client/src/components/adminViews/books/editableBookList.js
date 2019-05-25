import React, {Component} from 'react';
import {Table} from 'reactstrap';
import EditableBook from './editableBook';

class EditableBookList extends Component {

    render(){
        const{books, deletBook} = this.props;
        return(
            <div> 
                <Table responsive > 
                    <thead> 
                        <tr> 
                            <th>Title </th>
                            <th>Author </th>
                            <th>Actions </th>
                        </tr>
                    </thead>
                    <tbody> 
                        {
                            books.map(book => 
                                <EditableBook  book = {book} deleteBook = {deletBook}/>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default EditableBookList;
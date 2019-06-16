import React, {Component} from 'react';
import {Table} from 'reactstrap';

class BookDetails extends Component {
    state = {book: {}}

    componentDidMount(){
        const bookId = this.props.match.params.bookId;
        
        fetch(`/api/books/${bookId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `${localStorage.userToken}`
            }
        })
        .then(res => { return res.json()})
        .then(data => {
            this.setState({book: data.book})
        })
        .catch(err => console.log(err))

    }
    render(){
        const book = this.state.book;
        if(!book)
            return <div>No details found </div>
        return(
            <div style = {{textAlign: 'center'}}> 
                <h3> Book Details </h3>
                <p> <img src= {book.cover} alt='book cover' /> </p>
                <Table responsive size='sm'   style = {{color: '#ccc'}}> 
                    <thead> </thead>
                    <tbody> 
                        <tr> <td>Title</td> <td>{book.title}</td> </tr>
                        <tr> <td>Author</td> <td>{book.author}</td> </tr>
                        <tr> <td>Isbn</td> <td>{book.isbn}</td> </tr>
                        <tr> <td>published Year</td> <td>{book.publishedYear}</td> </tr>
                        <tr> <td>pages</td> <td>{book.pages}</td> </tr> 
                        <tr> <td>language</td> <td>{book.language}</td> </tr>
                        <tr> <td>Category</td>< td>{book.category}</td> </tr>
                        <tr> <td>Copies</td> <td>{book.quantity}</td> </tr>
                    </tbody>
                </Table>
                <p> {book.about} </p>
            </div>
        )
    }
}

export default BookDetails;
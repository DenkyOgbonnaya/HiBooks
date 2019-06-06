import actionType from './actionType'; 
import swal from 'sweetalert';
import jwt from 'jsonwebtoken'

/* @Description....adds a new book
* @Param {obj}....book object
*/
export const addBook = book => {
return (dispatch, getState) => {
    fetch('api/admin/addBook', {
          method: 'POST',
          headers: {
            'Accept': 'Application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(book)
        })
        .then(res => {
          if(res.status === 200){
              return res.json()
          }     
        })
        .then(data => {
            swal({
                title:'Add Book',
                text: data.message,
                icon: 'success'
            })
            
             dispatch({
                 type: actionType.ADD_BOOK,
                 book: data.book
             });
        })
        .catch(err => console.log(err))
}
}

/* @Description....modifies an existing book
* @Param {obj}....book id
@Param {obj}.... modified book
*/
export const modifyBook = (_id, newData ) => {
    return dispatch => {
        fetch(`api/admin/modify/${_id}`,{
          method: 'PUT',
          headers: {
            'Accept': 'Application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData)
        })
        .then(res => {
          if(res.status === 200){
            swal({
                title:'Modify Book',
                text: 'Book Modified',
                icon: 'success'
            } )
            dispatch({
                type:actionType.MODIFY_BOOK
            })
          }
        })
        .catch(err =>{
        console.log(err);
        })
    }
    
}

/* @Description....deletes an existing book
* @Param {obj}....book id
*/
export const deleteBook = (_id) => {
    return (dispatch) => {
        dispatch({
            type: actionType.DELETE_BOOK,
            bookId: _id
        })
        fetch(`api/admin/delete/${_id}`,{
        method: 'DELETE'
        }).then(res => {
            if(res.status === 200){
                swal('book deleted')
                dispatch({
                    type: actionType.DELETE_BOOK,
                    bookId: _id
                })
            }
                
    }).catch(err =>{
        console.log(err);
    })
    }
    
}

/* 
* @Description....gets all book in the liberary
* @Return {obj}....array of books
*/
export const getAllBooks = () => {
    return (dispatch) => {
        fetch('api/books')
        .then((res)=>{
            if(res.status === 200)
                return res.json();
        })
        .then((data)=>{
            dispatch({
                type: actionType.GET_ALL_BOOKS,
                books: data.books
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
}

/* 
* @Description....rent a book
* @param {obj}....book
* @Param {obj}....user id
*/
export const rentBook = (userId, bookId) => {
    return (dispatch) => {
        fetch(`api/users/${userId}/books`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.userToken}`
        },
        body: JSON.stringify({bookId})
        
    }).then(res => {
        return res.json()
    })
    .then((data)=>{
        if(data.status === 'success'){
            swal(data.message)
            dispatch({
            type: actionType.RENT_BOOK
            })
        }else
            swal(data.message) 
    }).catch((err)=>{
        console.log(err)
    })
    }
}

/* 
* @Description....get users rented books
* @param {obj}....user id
*/
export const rentedBooks = userId => {
    return (dispatch) => {
        fetch(`api/users/${userId}/books`, {
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.userToken}`
            },
        })
        .then(res => {
            if(res.status === 200)
                return res.json()
        })
        .then(data => {
            dispatch({
                type: actionType.GET_RENTED_BOOKS,
                books: data.rentedBooks
            })
        })
        .catch(err => console.log(err))
    }
}

/* 
* @Description....get users rent history
* @param {obj}....user id
*/
export const rentHistory = userName => {
    return (dispatch) => {
        fetch(`api/books/borrowedLog/${userName}`)
        .then((res)=>{
            if(res.status === 200)
                return res.json();
        })
        .then((logs)=>{
            dispatch({
                type: actionType.GET_BORROWED_HISTORY,
                logs
            })
        })
        .catch(err => console.log(err));
    }
}

/* 
* @Description....return borrowed books
* @param {obj}....rented book
*/
export const returnBook = (bookId, userId) => {
    return (dispatch) => {
            fetch(`api/users/${userId}/books`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.userToken}`
                },
                body: JSON.stringify({bookId})
            })
            .then(res => {
                if(res.status === 200)
                    return res.json();
            })
            .then(data => {
                swal(data.message);
                dispatch({
                    type: actionType.RETURN_BOOK,
                    bookId: data.bookId
                })
            })
            .catch(err => console.log(err))
    }
}
import actionType from './actionType'; 
import swal from 'sweetalert';
import jwt from 'jsonwebtoken'

/* @Description....adds a new book
* @Param {obj}....book object
*/
export const addBook = book => {
return (dispatch, getState) => {
    fetch('api/books', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.userToken}`
        },
          body: book
        })
        .then(res => {
              return res.json() 
        })
        .then(data => {
            if(data.status === 'success'){
                swal({
                    title:'Add Book',
                    text: data.message,
                    icon: 'success'
                })
            
                dispatch({
                    type: actionType.ADD_BOOK,
                    book: data.book
                });
            }
            swal(data.message)
        })
        .catch(err => console.log(err))
}
}

/* @Description....modifies an existing book
* @Param {obj}....book id
@Param {obj}.... modified book
*/
export const editBook = (_id, newData ) => {
    return dispatch => {
        fetch(`api/books/${_id}`,{
          method: 'PUT',
          headers: {
            'Accept': 'Application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.userToken}`
          },
          body: JSON.stringify(newData)
        })
        .then(res => {
          return res.json()
        })
        .then(data => {
            if(data.status === 'success'){
                swal({
                    title:'Modify Book',
                    text: 'Book Modified',
                    icon: 'success'
                } )
               dispatch({
                   type: actionType.MODIFY_BOOK,
                   book: data.book
               })
            }
            swal(`error: ${data.message}`)
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
        fetch(`api/books/${_id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `${localStorage.userToken}`
        }
        }).then(res => {
            if(res.status === 200){
                swal('book deleted')
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
export const getAllBooks = (pageNum, limit) => {
    return (dispatch) => {
        fetch(`api/books?page=${pageNum}&limit=${limit}`)
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
* @Description....seach for book in the liberary
* @Return {obj}....array of books
*/
export const searchBook = (search, category) => {
    return (dispatch) => {
        fetch(`api/book/search?search=${search}&category=${category}`)
        .then((res)=>{
            if(res.status === 200)
                return res.json();
        })
        .then((data)=>{
            dispatch({
                type: actionType.SEARCH_BOOK,
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
export const addCategory = category => {
    return dispatch => {
        fetch('api/categories', {
              method: 'POST',
              headers: {
                'Accept': 'Application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.userToken}`
              },
              body: JSON.stringify({name: category})
            })
            .then(res => {
                  return res.json()
            })
            .then(data => {
                if(data.status === 'success'){
                    swal({
                        title:'Category',
                        text: data.message,
                        icon: 'success'
                    })
                 dispatch({
                     type: actionType.ADD_CATEGORY,
                     category: data.category
                 });
                }
                swal(data.message)
            })
            .catch(err => console.log(err))
        }
    }
    export const editCategory = (id, name) => {
        return dispatch => {
            fetch(`api/categories/${id}`, {
                  method: 'PUT',
                  headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.userToken}`
                  },
                  body: JSON.stringify({name})
                })
                .then(res => {
                      return res.json()
                })
                .then(data => {
                    if(data.status === 'success'){
                        swal({
                            title:'Category',
                            text: data.message,
                            icon: 'success'
                        })
                     dispatch({
                         type: actionType.EDIT_CATEGORY,
                         category: data.category
                     });
                    }
                    swal(data.message)
                })
                .catch(err => console.log(err))
            }
        }
    

    export const getCategories = () => {
        return (dispatch) => {
            fetch('api/categories')
            .then((res)=>{
                if(res.status === 200)
                    return res.json();
            })
            .then(data =>{
                dispatch({
                    type: actionType.GET_CATEGORIES,
                    categories: data.categories
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    }
    
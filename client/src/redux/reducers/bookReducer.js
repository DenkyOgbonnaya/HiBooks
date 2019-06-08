import actionType from '../actions/actionType';

const initState = {
    allBooks: [],
    rentedBooks: [],
    rentedLogs: [],
    categories: [],
    currentPage: 1,
    pages:1,
    isLoading: true,
}
const bookReducer = (state = initState, action) => {
    switch(action.type){
        case actionType.GET_ALL_BOOKS :
            return{
                ...state,
                allBooks: action.books.data,
                currentPage: action.books.page,
                pages: action.books.pages
            }
        case actionType.ADD_BOOK :
            return{
                ...state,
                allBooks: state.allBooks.concat(action.book)
            }
        case actionType.GET_RENTED_BOOKS :
            return {
                ...state,
                rentedBooks:  action.books,
                booksCounter: action.books.length
            }
        case actionType.GET_BORROWED_HISTORY :
            return {
                ...state,
                rentedLogs: action.logs,
                booksCounter: action.logs.length
            }
        case actionType.MODIFY_BOOK :
        return{
            ...state,
            allBooks: state.allBooks.map(book => book._id === action.book._id ?  
                Object.assign({}, book, action.book ) : book
            )
        }
        case actionType.DELETE_BOOK :
        return{
            ...state,
            allBooks: state.allBooks.filter( book => book._id !== action.bookId)
        }
        case actionType.RETURN_BOOK : 
        return{
            ...state,
            rentedBooks: state.rentedBooks.filter(record => record.book._id !== action.bookId)
        }
        case actionType.TOGGLE_SPINNER :
        return{
            ...state,
            isLoading: !state.isLoading
        }
        case actionType.GET_CATEGORIES :
            return{
                ...state,
                categories: action.categories
            }
        case actionType.ADD_CATEGORY :
            return{
                ...state,
                categories: state.categories.concat(action.category)
            }
            case actionType.EDIT_CATEGORY :
            return{
                ...state,
                categories: state.categories.map(category => category._id === action.category._id ?  
                    Object.assign({}, category, action.category ) : category
                )
            }
        default : return state
    }
}
export default bookReducer;
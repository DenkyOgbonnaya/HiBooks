import actionType from '../actions/actionType';

const initState = {
    allBooks: [],
    rentedBooks: [],
    rentedLogs: [],
    availableBooks: [],
    booksCounter: 0,
    isLoading: true,
    renderAddBooks: false
}
const bookReducer = (state = initState, action) => {
    switch(action.type){
        case actionType.GET_ALL_BOOKS :
            return{
                ...state,
                allBooks: action.books,
                booksCounter: action.books.length
            }
        case actionType.ADD_BOOK :
            return{
                ...state,
                allBooks: [...state.allBooks, action.book]
            }
        case actionType.GET_RENTED_BOOKS :
            return {
                ...state,
                rentedBooks:  action.books,
                booksCounter: action.books.length
            }
        case actionType.GET_AVAILABLE_BOOKS :
            return {
                ...state,
                availableBooks: action.books
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
        default : return state
    }
}
export default bookReducer;
import actionType from '../actions/actionType';

const initState = {
    allBooks: [],
    rentedBooks: [],
    rentedLogs: [],
    availableBooks: [],
    booksCounter: 0
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
        }
        default : return state
    }
}
export default bookReducer;
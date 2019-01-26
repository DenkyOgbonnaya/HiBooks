import bookReducer from './bookReducer';
import authReducer from "./authReducer";
import { combineReducers} from 'redux';

const rootReducer = combineReducers({
    books: bookReducer,
    auth: authReducer
})

export default rootReducer;
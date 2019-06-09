import actionType from '../actions/actionType';

const initState = {
    currentUser : {},
    authenticated : false,
    showButtonGroup: false,
    message: '',
    hideSidebar: true
}
const authReducer = (state = initState, action) => {
    
    switch(action.type){
        case actionType.SIGN_UP_USER : 
            return {
                ...state,
                currentUser : action.currentUser,
                authenticated : action.authenticated
            }
        case actionType.AUTH_TOKEN :
            return {
                ...state,
                currentUser : action.currentUser,
                authenticated : action.authenticated
            }
        case actionType.LOGIN_USER :
            return {
                ...state,
                currentUser : action.currentUser,
                authenticated : action.authenticated
            }
        case actionType.LOG_OUT_USER :
            return {
                ...state,
                currentUser : {},
                authenticated : false
            }
        
        case actionType.LOGIN_ERROR :
            return{
                ...state,
                message: action.message,
                authenticated: action.authenticated
            }
        case actionType.TOGGLE_SIDEBAR :
            return{
                ...state,
                hideSidebar: !state.hideSidebar
            }
        case actionType.CLOSE_SIDEBAR :
            return{
                ...state,
                hideSidebar: true
            }
        case actionType.SET_MESSAGE :
            return{
                ...state,
                message: action.message
            }
        default : 
            return state
    }
}
export default authReducer;

import actionType from './actionType';
import jwt from "jsonwebtoken";
import swal from 'sweetalert';


export const signUp = userData => {
    return dispatch => {
        fetch("api/users/signUp", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then((res)=> {
            if(res.status === 201){
                return res.json()
            }
        })
        .then(data => {
            localStorage.userToken = JSON.stringify(data.token);
            const decoded = jwt.decode(data.token);
            dispatch({
                type: actionType.SIGN_UP_USER,
                currentUser: decoded.currentUser,
                authenticated: true
            })
    })
    .catch((err)=> {
        console.log(err);
    })
    }
}
export const login = userData => {
    
    return dispatch => {
        fetch(`api/users/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res=> {
            if(res.status ===201 || res.status === 202)
            return res.json()
        })
        .then((data)=> {
           if(data.authenticated){
            localStorage.userToken = JSON.stringify(data.token);
            const decoded = jwt.decode(data.token);
            dispatch({
                type: actionType.LOGIN_USER,
                currentUser: decoded.currentUser,
                authenticated: true
            }) 
           }else
           dispatch({
               type: actionType.LOGIN_ERROR,
               message: data.message,
               authenticated: false
           })
        })
        .catch((err)=> {
            console.log(err);
        })
    } 
}
export const logout = () => {
    return dispatch => {
        localStorage.removeItem('userToken');
        dispatch({
            type: actionType.LOG_OUT_USER
        })
    }
}
export const authToken = token => {
    const userToken = `Bearer ${token}`
    return dispatch => {
        fetch(`api/users/verifyUser`,{
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'x-www-form-urlencoded',
                'Authorization': `${userToken}`
            }
        })
        .then(res => {
            if(res.status === 200)
                return res.json()
        })
        .then(data => {
            if(data.authenticated){
                const decoded = jwt.decode(data.token)
                dispatch({
                    type: actionType.AUTH_TOKEN,
                    currentUser : decoded.currentUser,
                    authenticated : true
                })
            }
        })
        .catch(err => console.log(err))
    }
}
/*export const toggleGroupButton= () => {
    const action = {
        type: actionType.TOGGLE_GROUP_BUTTON,
        payLoad: true
    }
   
}*/
export const userNameExist = userName => {
       return fetch(`api/users/nameExist/${userName}`)
    
}
export const emailExist = email => {
        return fetch(`api/users/emailExist/${email}`)
}
export const editProfile = (userId, newData) => {
    return dispatch => {
        fetch(`api/users/editProfile/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newData})
        })

        .then(res => {
            if(res.status === 201)
                return res.json()
        })
        .then(data => {
            localStorage.userToken = data.token;
            const decoded = jwt.decode(data.token);
            swal(data.message)
            dispatch({
                type: actionType.LOGIN_USER,
                currentUser: decoded.currentUser,
                authenticated: true
            })
        })
    }
}
export const changePassword = (userId, data) => {
    return dispatch => {
    const{oldPassword,newPassword} = data;
    const token =  localStorage.userToken;
    fetch(`api/users/changePassword/${userId}`,{
        method: 'PUT',
        withCredentials:true,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', /*x-www-form-urlencoded*/
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            oldPassword,
            newPassword
        })
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        dispatch({type:actionType.SET_MESSAGE, message:data.message});
    })
    .catch(err => console.log(err))
}
}
export const toggleSideBar= () => {
    return dispatch => dispatch({type: actionType.TOGGLE_SIDEBAR})
   
}

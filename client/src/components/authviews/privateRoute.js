import React from 'react';
import {connect} from 'react-redux'
import {Redirect, Route, withRouter} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const{authenticated} = rest
    return(
        <Route {...rest} render = { props => (
            authenticated ? <Component {...props}  /> : <Redirect to = {{
                pathname: '/login',
                state: {from: props.location}
            }} />
        )} />
    )
}

const mapStateToProps = state => {
    return{
        authenticated: state.auth.authenticated
    }
}


export default connect(mapStateToProps)(PrivateRoute)
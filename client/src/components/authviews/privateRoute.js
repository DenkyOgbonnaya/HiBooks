import React from 'react';
import {connect} from 'react-redux'
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render = { props => (
            this.props.isAuthenticated ? <Component {...props}  /> : <Redirect to = {{
                pathname: '/login',
                state: {from: props.location}
            }} />
        )} />
    )
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.authenticated
    }
}


export default  connect(mapStateToProps)(PrivateRoute);
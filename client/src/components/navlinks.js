import React from 'react';
import {NavLink} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';

const Links = (props)=>
    <NavLink to={props.route}  tag={RRNavLink} >{props.name}</NavLink>


export default Links;
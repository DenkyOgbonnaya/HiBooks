import React from 'react';
import {Link} from 'react-router-dom';

const Footer = (props) => 
    <div className='footer' > 
        <Link style={{color:'#ccc'}} to="/contact">Contact</Link>  <Link style={{color:'#ccc'}} to="/about">About</Link> 
            {'  |  '} (C) 2019, Made with <span style={{color: '#e25555', fontSize: '25px'}}>❤️‍</span> by
            <a href='https://github.com/DenkyOgbonnaya' style={{color: '#ccc'}}> Dennis Ogbonnaya </a>
    </div>

export default Footer;
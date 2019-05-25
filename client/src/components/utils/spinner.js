import React from 'react';
//import {Spinner} from 'reactstrap';

const Spinnar = () => {
    const style = {textAlign: 'center'}
    return(
        <div> 
           { /*<p style={style}> <Spinner color='warning'/> </p>*/}
            <p style={style} ><span> Loading... </span> </p>
        </div>
    )
}

export default Spinnar;
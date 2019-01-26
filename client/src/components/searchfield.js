import React from "react";
import {Input} from 'reactstrap';

const style = { backgroundColor: '#333', borderColor: '#333',borderRadius: '10px',color:'#ccc' };
const SearchField = (props) => (
    <Input style={style} value={props.value} onChange={props.onChange}
    placeholder='Search for a book' />
    )

export default SearchField;
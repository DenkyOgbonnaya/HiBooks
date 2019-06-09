import React from "react";
import {Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';

const style = { backgroundColor: '#333', borderColor: '#333',borderRadius: '10px',color:'#ccc' };

const SearchField = ({categories,  setSearch, setCategory, handleSearch}) => (
    <InputGroup>
        <InputGroupAddon addonType= 'prepend' >
            <Input type = 'select' name="category"  onChange = {e => setCategory(e.target.value)} style= {style} > 
                <option key='All'> All </option>
                { categories.length > 0 ?
                    categories.map(category => 
                <option key= {category._id} value= {category.name}  >{category.name} </option>)
                : null}
            </Input>
        </InputGroupAddon>
            <Input placeholder = 'Search book...'  onChange = { e => setSearch(e.target.value)} style={style} />
            <InputGroupAddon addonType='append' ><Button onClick = {() => handleSearch()} >Search</Button></InputGroupAddon>
        </InputGroup>
    )

export default SearchField;
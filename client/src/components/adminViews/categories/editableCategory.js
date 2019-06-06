import React, {Component} from 'react';
import CategoryForm from './categoryForm';
import {Button} from 'reactstrap';

class EditableCategory extends Component {

    state = {
        showCategoryForm: false
    }
    toggleCategoryForm = () => {
        this.setState({showCategoryForm: !this.state.showCategoryForm})
    }

    render(){
        const{category} = this.props
        if(this.state.showCategoryForm)
        return(
            <tr>
                <td>
                    <CategoryForm name = {category.name} _id = {category._id} closeForm = {this.toggleCategoryForm} />
                </td>
            </tr>
        )
        return(
            <tr > 
                <td>{category.name} </td>
                <td> <Button onClick = {this.toggleCategoryForm} >Edit </Button> </td>
            </tr>
        )
    }
}
export default EditableCategory;
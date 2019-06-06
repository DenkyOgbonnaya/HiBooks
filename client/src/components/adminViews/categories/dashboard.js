import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCategories} from '../../../redux/actions/bookActions';
import CategoryForm from './categoryForm';
import {Table} from 'reactstrap';
import EditableCategory from './editableCategory';
class DashBoard extends Component {

    componentDidMount(){
        this.props.getCategories();
    }
    render(){
        return(
            <div> 
                <h3>Categories </h3>
                <CategoryForm />
                <br />
                <CategoryList categories = {this.props.categories} />

            </div>
        )
    }
}

const CategoryList = ({categories}) => {
    if(categories)
    return(
        <div> 
            <Table> 
                <thead> 
                    <tr> 
                        <th> Name </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody> 
                    {
                        categories.map(category => 
                            <EditableCategory key= {category._id} category = {category} />
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
    return <div>No categories </div>
}
const mapStateToProps = state => {
    return{
        categories: state.books.categories,
    }
}
const mapDispatchToprops = dispatch => {
    return{
        getCategories: () => dispatch(getCategories())
    }
}   

export default connect(mapStateToProps, mapDispatchToprops)(DashBoard);
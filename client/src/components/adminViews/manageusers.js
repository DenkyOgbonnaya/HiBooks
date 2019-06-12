import React, {Component} from 'react';
import {Table, Input} from 'reactstrap';
import {Link} from 'react-router-dom';

const inputStyle = { backgroundColor: '#333', borderColor: '#333',borderRadius: '10px',color:'#ccc' };

class UsersDashboard extends Component {
    state = {
        users: [],
        searchTerm: '',
        isLoading : true
    }
    componentDidMount(){
        fetch('/api/users/all')
        .then(res => {return res.json()})
        .then(data => {
            if(data.status === 'success'){
                this.setState({
                    users: data.users,
                    isLoading: false
                })
            }
        })
        .catch(err => console.log(err))
    }
    handleInputChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }
    render(){
        return(
            <div> 
                <h3>Library users</h3>
                <Search handleInputChange = {this.handleInputChange} />
                <hr />
                <UserList users= {this.state.users } searchTerm = {this.state.searchTerm} />
            </div>
        )
    }

}
const UserList = ({users, searchTerm}) =>
    <div> 
        <Table responsive size='sm' style = {{color: '#ccc'}} > 
            <thead> 
                <tr> 
                    <th>Name </th>
                    <th>email </th>
                    <th>location </th>
                </tr>
            </thead>
            <tbody> 
            {
                users.filter(user => !searchTerm || user.name.toLowerCase().includes(searchTerm.toLowerCase())).map(user => 
                    <tr> 
                        <td> {user.name} </td>
                        <td> {user.email} </td>
                        <td> {user.location} </td>
                        <td> <Link to = {`/${user._id}/books`}>Rented books </Link> </td>
                    </tr>
                )
            }
            </tbody>
        </Table>
    </div>

const Search = ({handleInputChange}) => 
            <Input onChange= {handleInputChange} placeholder= 'search user' style={inputStyle} />

export default UsersDashboard;
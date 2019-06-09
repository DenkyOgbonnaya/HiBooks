import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardText, CardTitle, Button, Col, Row, Container} from 'reactstrap';
import {rentHistory} from '../redux/actions/bookActions';

class RentLogs extends Component{
    state= {notifications: []};

    componentDidMount(){
        const{user} = this.props;
        fetch(`api/notifications/${user._id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `${localStorage.userToken}`
            }
        })
        .then(res => {return res.json()})
        .then(data =>{
            this.setState({notifications: data.notifications})
        })
        .catch(err => console.log(err))
    }

    render(){
        if(this.state.notifications.length === 0) 
        return(
            <div>You have no logs </div>
        )
        return(
            <div >
                <h3 style={{border:'2px solid #333', background:'#212121', height:'40px'}}> Rent Logs </h3>
                <br />
                {this.state.notifications.map(notification =>
                <div key ={notification._id}> 
                    <Card  style={{ backgroundColor: '#333', borderColor: '#757575' }}>
                        <CardBody>
                            <CardText>
                                <span> {notification.message} </span>
                                <small className="text-muted" style= {{float: "right"}}>
                                    {new Date(notification.time).toDateString()}
                                </small>
                            </CardText>
                        </CardBody>
                    </Card>
                    <br />
                </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.currentUser
    }
}
export default connect(mapStateToProps)(RentLogs);
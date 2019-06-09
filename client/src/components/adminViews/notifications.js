import React, {Component} from 'react';
import {Card, CardBody, CardText} from 'reactstrap';

export default class Notifications extends Component{
    state= {notifications: []};

    componentDidMount(){
        fetch('api/notifications', {
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
            <div>There are no new notification </div>
        )
        return(
            <div >
                <h3 style={{border:'2px solid #333', background:'#212121', height:'40px'}}> Notifications </h3>
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
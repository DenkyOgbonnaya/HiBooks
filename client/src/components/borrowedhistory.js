import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardText, CardTitle, Button, Col, Row, Container} from 'reactstrap';
import {rentHistory} from '../redux/actions/bookActions';

class BorrowedHistory extends Component{
    componentDidMount(){
        const userName = this.props.user.name;
        this.props.rentHistory(userName);
    }

    render(){
        if(this.props.rentedLogs.legnth != 0)
        return(
            <div>
                <h3 style={{border:'2px solid #333', background:'#212121', height:'40px'}}> Your borrownng logs </h3>
                <Container >
                    <Row>
                        {
                            this.props.rentedLogs.reverse().map(log => 
                                <Col  md='3' key={log._id}>
                                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                        <CardBody>
                                            <CardTitle> {log.book.title} </CardTitle>
                                            <CardText> <span> {log.book.author} </span> </CardText>
                                            <CardText> 
                                                <small className='text-muted' > <span> {log.dateBorrowed} </span> </small>
                                            </CardText>
                                            <Button style= {{float:"right", marginBottom:"1px"}} onClick= {(e)=> {e.target.disabled = true;} }> Delete </Button>
                                        </CardBody>
                                    </Card>
                                    <br />
                                </Col>
                            )
                        }
                    </Row>
                </Container>
            
            </div>
                
        )
        return(
            <div> 
                <h3 style={{border:'2px solid #333', background:'#212121', height:'40px'}}> Your borrownng logs </h3>
                No borrowed logs
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        user: state.auth.currentUser,
        rentedLogs: state.books.rentedLogs,
        booksCounter: state.books.booksCounter
    }
}   
const mapDispatchToProps = dispatch => {
    return {
        rentHistory: userName => dispatch(rentHistory(userName))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BorrowedHistory);
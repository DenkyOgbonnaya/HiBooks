import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {NavLink as RRNavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Can from '../utils/can';
import { logout} from "../../redux/actions/authActions";
import actionType from "../../redux/actions/actionType";
import PlanModal from "../utils/planmodal";

class SideNav extends React.Component {
  state= {
    isModalOpen: false
  }
  showButtonGroup = ()=>{
    this.props.groupButtonToggle();
  }
  showModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }
  render() {
    const{user} = this.props;
    return (
      <div className='sideBar' >
      {this.state.isModalOpen?
              < PlanModal modalOpen = {this.state.isModalOpen} toggle={this.toggleModal} /> :
              null
          }
        <div className='librarian'> 
          <img src='/images/icons/user.png' alt = ''/> {`${user.name} -${user.role}`}
          <Link to='/' > <img src='/images/icons/home.png' alt=''/></Link>
        </div>
        <div className='dashboard' > <img src='/images/icons/dashboard.png' alt='' /> Dashboard </div>
        <Nav vertical>
          <NavItem>
            <NavLink to= {`/${this.props.user.name}`} className='navLink'
            tag={RRNavLink} > <img src='/images/icons/profile.png' alt='' /> Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to= '/rentlogs' className='navLink'
              tag={RRNavLink}> <img src='/images/icons/history.png' alt=''/> Rent logs 
            </NavLink> 
          </NavItem>
          <NavItem>
            <NavLink to= '/' onClick= {this.showModal} className='navLink'
            tag={RRNavLink} > <img src='/images/icons/upgrade.png' alt=''/> Upgrade plan </NavLink>
          </NavItem>
          <Can
            role = {this.props.user.role} 
            perform='admin-board:visit'
            yes ={()=>(
              <div>
                <hr />
                <NavItem>
                  <NavLink to='/books'  className='navLink'
                  tag={RRNavLink}> <img src='/images/icons/edit.png'alt=''/> Manage books</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/categories'  className='navLink'
                  tag={RRNavLink}> <img src='/images/icons/edit.png'alt=''/> Categories</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/users' className='navLink'
                  tag={RRNavLink}> <img src='/images/icons/users.png' alt=''/>  Manage users </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/notifications' className='navLink'
                  tag={RRNavLink}> <img src='/images/icons/notifications.png' alt=''/>  Notifications </NavLink>
                </NavItem>
              </div>
            )}
          />
          <NavItem > <hr /> </NavItem>
          <NavItem>
            <NavLink to='/' onClick = {() => this.props.logoutUser()}  className='navLink'
            tag={RRNavLink} > <img src='/images/icons/logout.png' alt=''/> Log out</NavLink>
          </NavItem>
        </Nav>
    </div>
  );
  }
}
const mapStateToProps = state => {
    return{
      user: state.auth.currentUser,
      showButtonGroup: state.auth.showButtonGroup
    }
}
const mapDispatchToProps = dispatch => {
  return{
    groupButtonToggle: ()=> dispatch({type: actionType.TOGGLE_GROUP_BUTTON, payload: true}),
    logoutUser: ()=> {dispatch( logout())},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideNav)
import React,  {Component} from "react"
import {connect} from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
     } from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
    import {toggleSideBar} from "../../redux/actions/authActions";
  
class NavHeader extends Component{
    state= {
      isOpen:false,
    }

    toggle= ()=> {
        this.setState({
          isOpen: !this.state.isOpen
        });
        this.props.toggleSideBar();
      }
    
    render(){
      const{isAuthenticated} = this.props;
        return(
          <div>
        <Navbar style={{ backgroundColor: '#333', borderColor: '#333' }} dark expand={isAuthenticated ? "md" : "xs"}>
          <NavbarBrand href="/">HiBooks</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          {
            isAuthenticated ? 
            <Nav className="ml-auto" navbar>
              <NavItem>
              <NavLink to='/about' tag={RRNavLink} > About </NavLink>
            </NavItem>
          </Nav>
             :
            <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to='/login' tag={RRNavLink} > Login </NavLink>
            </NavItem>
              <NavItem>
              <NavLink to='/signup' tag={RRNavLink} > Signup </NavLink>
            </NavItem>
              <NavItem>
              <NavLink to='/about' tag={RRNavLink} > About </NavLink>
            </NavItem>
          </Nav>
          }
           
          </Collapse>
        </Navbar>
      </div> 
            
        )
        
    }
} 
const mapStateToProps = (state)=> {
  return{
    isAuthenticated: state.auth.authenticated,
  }
}
  const mapDispatchToProps = (dispatch)=> {
    return{
      toggleSideBar: ()=> dispatch(toggleSideBar())

    }
  }          
export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);

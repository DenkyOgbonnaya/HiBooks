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
              <hr />
            <Navbar dark style={{ backgroundColor: '#333', borderColor: '#333' }}  expand="md">
              <NavbarBrand style = {{fontSize: '20px'}} href="/">HiBooks</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink to='/login' name='Login' />
                  </NavItem>
                  <NavItem>
                    <NavLink to='/signUp' name='Sign Up' />
                  </NavItem>
                  <NavItem>
                    <NavLink to='/about' name='About' />
                  </NavItem>
                  </Nav>
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

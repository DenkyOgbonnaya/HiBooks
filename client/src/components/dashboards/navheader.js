import React,  {Component} from "react"
import {connect} from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
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
        return(
            <div>
              <hr />
            <Navbar dark style={{ backgroundColor: '#333', borderColor: '#333' }}  expand="md">
              <NavbarBrand style = {{fontSize: '20px'}} href="/">HiBooks</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
      
                </Nav>
              </Collapse>
            </Navbar>
          </div>
            
        )
        
    }
} 
const mapStateToProps = (state)=> {
  return{
    user: state.auth.currentUser,
  }
}
  const mapDispatchToProps = (dispatch)=> {
    return{
      toggleSideBar: ()=> dispatch(toggleSideBar())

    }
  }          
export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);

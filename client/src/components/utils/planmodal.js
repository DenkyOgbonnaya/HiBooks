
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import swal from 'sweetalert';

class PlanModal extends React.Component {
 
    state = {
      modal: this.props.modalOpen
    };
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }
      handleSubscribe = () => {
        swal('Subcription processing')
        this.toggle();
      }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} style={{background:'#212121'}}>Select plan</ModalHeader>
          <ModalBody style={{background:'#212121'}} >
          <Input type="select" name="select" id="exampleSelect">
            <option>Silver(Free)</option>
            <option>Gold(N5,000.00/Month)</option>
            <option>Plantinium(10,000.00/Month)</option>
          </Input >
          </ModalBody>
          <ModalFooter style={{background:'#212121'}}>
            <Button color="primary" onClick={this.handleSubscribe}>Subscribe</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default PlanModal;
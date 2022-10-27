import React from "react";
import Modal from "react-bootstrap/Modal";
import AddBookForm from "./AddBookForm";
import Button from 'react-bootstrap/Button';

class BookFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleCreateBook: this.props.handleCreateBook
        }
    }

    // handleShow = () => this.state.setShow(true);
    
    render() {
        
        return (

<Modal show={this.props.showBookModal} onHide={this.props.closeModal}>
    <Modal.Header closeButton>
        <Modal.Title>Add A New Book!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <AddBookForm
            handleCreateBook={this.state.handleCreateBook}
            />
            </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={this.props.closeModal}>
            Close
        </Button>
    </Modal.Footer>
</Modal>

        );
    }
}


export default BookFormModal;
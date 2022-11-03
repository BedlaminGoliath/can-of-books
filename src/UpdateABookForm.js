import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class UpdateABookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.selectedBook?._id,
      title: this.props.selectedBook?.title,
      description: this.props.selectedBook?.description,
      status: this.props.selectedBook?.status,
      src: this.props.selectedBook?.src
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('this.state: ', this.state);
    // DONE: we want to pass our updated book back up to App so that App can call the server with the newly updated info
    this.props.handleUpdateBook(this.state);
    this.props.handleOnHide();
  }

  handleTitleChange = event => this.setState({ title: event.target.value });
  handleDescriptionChange = event => this.setState({ description: event.target.value });
  handleImageChange = event => this.setState({ imgURL: event.target.value });
  handleStatusChange = event => this.setState({ status: event.target.checked });

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleOnHide} >
        <Modal.Header closeButton>
          <Modal.Title>Update Book!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.title}
                  onChange={this.handleTitleChange}
                  value={this.state.title}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.description}
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Read"
                  onChange={this.handleStatusChange}
                  checked={this.state.status}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.src}
                  value={this.state.src}
                  onChange={this.handleImageChange}
                />
              </Form.Group>


              <Button type='submit'>Submit</Button>

            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    )
  }
}

export default UpdateABookForm;

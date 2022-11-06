import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class AddBookForm extends React.Component{

  onSubmit = (event) => {
    event.preventDefault();
    const newBook = {
      title: event.target.formTitle.value,
      description: event.target.formDescription.value,
      status: event.target.formStatus.checked,
      src: event.target.formUrl.value
    }
    console.log(`Here is our NEW Book: `, newBook);
    // we need to pass this newCat back up to App.js to be sent to the server
    // then the server is going to use Mongoose to create a new cat in the database
    this.props.handleCreateBook(newBook);
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.onSubmit}>

          <Form.Group controlId='formTitle'>
            <Form.Label>Books Name</Form.Label>
            <Form.Control
              type='text'
              placeholder="books title goes here..."
            />
          </Form.Group>

          <Form.Group controlId='formDescription'>
            <Form.Label>Book's description</Form.Label>
            <Form.Control
              type='text'
              placeholder="books description goes here"
            />
          </Form.Group>

          <Form.Group controlId='formStatus'>
            <Form.Label>Book's status</Form.Label>
            <Form.Check
              type='checkbox'
              label="Read"
              />
          </Form.Group>

          <Form.Group controlId='formUrl'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder="Book's image url goes here"
            />
          </Form.Group>

          <Button type="submit">Create Book!</Button>

        </Form>
      </Container>
    )
  }
}

export default AddBookForm;
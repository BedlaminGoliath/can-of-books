import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBookModal: false,
      errorMessage: ''
    }
  }

  handleClose = () => this.setState({ showBookModal: false });


  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  componentDidMount = async () => {
    const config = {
      method: 'get', // get is the default
      baseURL: process.env.REACT_APP_SERVER,
      url: '/books' // endpoint
    }

    const response = await axios(config);
    console.log('DATA: ', response.data);
    this.setState({ books: response.data });
  }

  handleCreateBook = async (bookToBeCreated) => {
    try {
      const config = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        data: bookToBeCreated // 'data' is the data to be sent on the request.body
      }
      const response = await axios(config);
      this.setState({ books: [...this.state.books, response.data] });
    } catch(error) {
      console.error('Error is in the App.js in the createBook Function: ', error);
      // axios sends more info about the error in a response object on the error
      this.setState({ errorMessage: `Status Code ${error.response.status}: ${error.response.data}`});
    }
  }

  showModal = () => this.setState({ showBookModal: true });

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <Button onClick={this.showModal}>Add a New Book!</Button>

        {this.state.showBookModal && 
          <BookFormModal
            handleCreateBook={this.handleCreateBook}
            showBookModal={this.state.showBookModal}
            closeModal={this.handleClose}
          /> }

        {!this.state.errorMessage ? (
             <><Carousel>
              {this.state.books.map(book => 
                
            <Carousel.Item key={book._id}>
              <img
                className="d-block w-100"
                src={book.src}
                alt={book.title} />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <p>{book.status}</p>
              </Carousel.Caption>
            </Carousel.Item>
                )}
          </Carousel></>
          
        ) : (
          <h3>{this.state.errorMessage}</h3>
        )}
      </>
    )
  }
}

export default BestBooks;

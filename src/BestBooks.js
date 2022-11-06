import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import UpdateABookForm from './UpdateABookForm';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBookModal: false,
      errorMessage: '',
      selectedBook: {},
      show: false
    }
  }

  handleClose = () => this.setState({ showBookModal: false });

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  componentDidMount = async () => {

    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      console.log('token: ', jwt);

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'get', // get is the default
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books' // endpoint
      }

      const response = await axios(config);
      console.log('DATA: ', response.data);
      this.setState({ books: response.data });
    }
  }

    handleCreateBook = async (bookToBeCreated) => {

      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
  
        // leave this console here in order to grab your token for backend testing in Thunder Client
        console.log('token: ', jwt); 

      try {
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'post',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/books',
          data: bookToBeCreated // 'data' is the data to be sent on the request.body
        }
        const response = await axios(config);
        this.setState({ books: [...this.state.books, response.data] });
      } catch (error) {
        console.error('Error is in the BestBooks.js in the createBook Function: ', error);
        // axios sends more info about the error in a response object on the error
        this.setState({ errorMessage: `Status Code ${error.response.status}: ${error.response.data}` });
      }
    }
  }
    handleDeleteBook = async (bookToBeDeleted) => {

      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
  
        // leave this console here in order to grab your token for backend testing in Thunder Client
        console.log('token: ', jwt);

      try {
        const proceed = window.confirm(`Do you wish to delete ${bookToBeDeleted.title}?`);

        if (proceed) {
          const config = {
            headers: { "Authorization": `Bearer ${jwt}` },
            method: 'delete',
            baseURL: process.env.REACT_APP_SERVER,
            url: `/books/${bookToBeDeleted._id}`
          }

          const response = await axios(config);
          console.log(response.data);
          const newBooksArr = this.state.books.filter(book => book._id !== bookToBeDeleted._id);
          this.setState({ books: newBooksArr });
        }
      } catch (error) {
        console.error('Error is in the BestBooks.js in the deleteBook Function: ', error);
        // axios sends more info about the error in a response object on the error
        this.setState({ errorMessage: `Status Code ${error.response.status}: ${error.response.data}` });
      }
    }
  }
    handleUpdateBook = async (bookToBeUpdated) => {

      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
  
        // leave this console here in order to grab your token for backend testing in Thunder Client
        console.log('token: ', jwt);

      try {
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'put',
          baseURL: process.env.REACT_APP_SERVER,
          url: `/books/${bookToBeUpdated._id}`,
          data: bookToBeUpdated
        }

        const response = await axios(config);
        console.log(response.data);
        const updatedBooks = this.state.books.map(preExistingBook => {
          if (preExistingBook._id === bookToBeUpdated._id) {
            return bookToBeUpdated;
          } else {
            return preExistingBook;
          }
        })
        this.setState({ books: updatedBooks });
      } catch (error) {
        console.error('Error is in the App.js in the updateBook Function: ', error);
        // axios sends more info about the error in a response object on the error
        this.setState({ errorMessage: `Status Code ${error.response.status}: ${error.response.data}` });
      }
    }
  }
  
    handleSelectBook = (bookToBeSelected) => this.setState({ selectedBook: bookToBeSelected, show: true });
    handleOnHide = () => this.setState({ selectedBook: {}, show: false })

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
            />}

          {this.state.selectedBook.title &&
            <UpdateABookForm
              handleUpdateBook={this.handleUpdateBook}
              selectedBook={this.state.selectedBook}
              show={this.state.show}
              handleOnHide={this.handleOnHide}
            />}


          {!this.state.errorMessage ? (
            <><Carousel className='carousel'>
              {this.state.books.map(book =>

                <Carousel.Item key={book._id}>
                  <img
                    className="d-block w-100"
                    src={book.src}
                    alt={book.title} />
                  <Carousel.Caption>
                    <h3>{book.title}</h3>
                    <p>{book.description}</p>
                    <p>{book.status ? <p>Read</p> : <p>Unread</p>}</p>
                    <Button onClick={() => this.handleSelectBook(book)}>Update this book!</Button>
                    <Button onClick={() => this.handleDeleteBook(book)}>Delete this book!</Button>
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

export default withAuth0(BestBooks);


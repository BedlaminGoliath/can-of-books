import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

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


  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
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
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;

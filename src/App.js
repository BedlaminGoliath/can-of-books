import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { withAuth0 } from "@auth0/auth0-react";
import Login from './Login';
import Profile from './Profile';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/"
              element={this.props.auth0.isAuthenticated ?
                <>

                  <BestBooks />

                </>
                :
                <Login />
              }
            >
            </Route>
            <Route
              exact path="/profile"
              element={
                <Profile />
              }
            ></Route>
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
            <Route
              exact path="/about"
              element={<About />}
            >
            </Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    )
  }
}

export default withAuth0(App);

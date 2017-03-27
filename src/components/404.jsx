// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router';

class NotFound extends Component {
  componentDidMount() {
    document.title = "404";
  }

  render() {
    return (
        <div className="container">
            <h1>404 &mdash; Page Not Found</h1>
            <p>The page you were looking for could not be found. Go back to the <Link to={'/'}>start page</Link>.</p>
        </div>
    )
  }
}

export default NotFound;
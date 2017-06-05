// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  componentDidMount() {
    document.title = "404 | NSIS Forum Archive";
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
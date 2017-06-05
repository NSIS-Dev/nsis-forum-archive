// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import loadData from '../lib/load-data';

// Constants
const forumUrl = 'http://forums.winamp.com/forumdisplay.php?forumid=65';

class Index extends React.Component {

  constructor() {
      super();
      this.state = {
        threads: []
      }
  }

  componentWillMount() {
    loadData()
    .then( (data) => {
       this.setState({
         threads: data
       })
      document.title = "NSIS Forum Archive";
    })
  }

  componentDidMount() {
    document.querySelector('.spinner').style.display = 'none';
  }

  render() {
    return (
      <div className="container">
        <h1 className="lead">Forum Index</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-left">Topic</th>
              <th className="text-right hidden-sm-down">Replies</th>
              <th className="text-right hidden-sm-down">Activity</th>
            </tr>
          </thead>
          <tbody>
            {this.state.threads.map(function(thread) {
              return (
                <tr id={'thread-' + thread.id} key={thread.id}>
                    <td>
                      { thread.sticky && <strong>Sticky:</strong> } <Link to={'/thread/'+ thread.id}>{thread.title}</Link>
                    </td>
                    <td className="text-muted text-right small hidden-sm-down">{thread.replies}</td>
                    <td className="text-muted text-right small hidden-sm-down"><span title={thread.date_string}>{thread.date_relative}</span></td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>
                  <span className="text-muted"><a className="text-muted" href={forumUrl}>Source</a></span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      )
  }
}

export default Index;

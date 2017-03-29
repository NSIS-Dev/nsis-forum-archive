// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router';
import { join } from 'path';

// Components
import getThread from '../lib/get-thread';

const Home = React.createClass({
  getInitialState: function() {
    return {
      data: []
    }
  },

  componentDidMount: function() {
    getThread(this, 'index', true);
  },

  // componentWillUnmount: function() {
  //   this.serverRequest.abort();
  // },

  render() {
    return (
      <div className="container">
        <h1 className="lead">Forum</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-left">Topic</th>
              <th className="text-right hidden-sm-down">Replies</th>
              <th className="text-right hidden-sm-down">Activity</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function(thread) {
              return (
                <tr id={thread.id} key={thread.id}>
                    <td>
                      <strong dangerouslySetInnerHTML={{ __html: thread.sticky_str }}></strong> <Link to={'/thread/'+ thread.id} activeStyle={{ color: 'red' }}>{thread.title}</Link>
                    </td>
                    <td className="text-muted text-right small hidden-sm-down">{thread.replies_str}</td>
                    <td className="text-muted text-right small hidden-sm-down"><span title={thread.date_str}>{thread.prettydate}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      )
  }
});

export default Home;
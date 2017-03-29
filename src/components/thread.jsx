// Components
import ThreadTableRow from './thread-tablerow.jsx';

// Dependencies
import React from 'react';
import { join } from 'path';
import getThread from '../lib/get-thread';

// Constants
const forumUrl = 'http://forums.winamp.com/showthread.php?t=';

const Thread = React.createClass({
  getInitialState: function() {
    return {
      data: {
        title: 'NSIS Forum Archive',
        posts: []
      }
    }
  },

  componentWillMount: function() {
    getThread(this, this.props.params.thread);
  },

  // componentWillUnmount: function() {
  //   this.serverRequest.abort();
  // },

  render() {
    return (
      <div className="container">
        <h1 className="lead"><a href="../">Forum</a> / {this.state.data.title}</h1>
        <table className="table table-striped table-responsive">
          <tbody>
            {this.state.data.posts.map(function(post) {
              return (
                <ThreadTableRow post={post} key={post.id} />
                );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>
                  <span className="text-muted"><a className="text-muted" href={forumUrl + this.state.data.thread_id}>Source</a> | <a className="text-muted" href={'http://web.archive.org/web/' + forumUrl + this.state.data.thread_id}>Internet Archive</a></span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      )
  }
});

export default Thread;
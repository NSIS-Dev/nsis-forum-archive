// Dependencies
import React from 'react';
import loadData from '../lib/load-data';

// Components
import Post from './post.jsx';

// Constants
const forumUrl = 'http://forums.winamp.com/showthread.php?t=';

class Thread extends React.Component {
  constructor() {
      super();
      this.state = {
        data: {
          title: 'NSIS Forum Archive',
          posts: []
        }
      }
  }

  componentWillMount() {
    loadData(this.props.match.params.thread)
    .then( (data) => {
       this.setState({
         data: data
       })
       document.title = data.title + ' | NSIS Forum Archive';
    })
  }

  componentDidMount() {
    document.querySelector('.spinner').style.display = 'none';
  }

  render() {
    return (
      <div className="container">
        <h1 className="lead"><a href="/">Forum Index</a> / {this.state.data.title}</h1>
        <table className="table table-striped">
          <tbody>
            {this.state.data.posts.map(function(post) {
              return (
                <Post post={post} key={post.id} />
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                <span title={"View Original: " + this.state.data.title} className="text-muted float-right"><a className="text-muted" href={forumUrl + this.state.data.id}>Source</a> | <a title={"Save \"" + this.state.data.title + "\" on the Wayback Machine"} className="text-muted" href={'http://web.archive.org/web/' + forumUrl + this.state.data.id}>Internet Archive</a></span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      )
  }
}

export default Thread;

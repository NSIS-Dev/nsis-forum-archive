// Dependencies
import React from 'react';

class Post extends React.Component {
  render() {
    return (
      <tr id={'post-' + this.props.post.id} key={this.props.post.id}>
        <td>
          <img src={this.props.post.user.avatar || ""} className="rounded-circle" />
        </td>
        <td>
            <span className="text-primary">{this.props.post.user.name || "(deleted user)"}</span>
            <span className="text-muted small float-right" data-toggle="tooltip" data-placement="top" title={this.props.post.date_string}>{this.props.post.date_relative}</span>
            <p dangerouslySetInnerHTML={{ __html: this.props.post.body }}></p>
        </td>
      </tr>
    )
  }
}

export default Post;

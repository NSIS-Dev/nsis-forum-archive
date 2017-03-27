// Dependencies
import React from 'react';

const ThreadTableRow = React.createClass({
  render() {
    return (
      <tr id={this.props.post.id} key={this.props.post.id}>
        <td>
          <p>
            <span className="text-primary">{this.props.post.user.name}</span>
            <span className="text-muted small float-right" data-toggle="tooltip" data-placement="top" title={this.props.post.date_str}>{this.props.post.prettydate}</span>
          </p>
          <p dangerouslySetInnerHTML={{ __html: this.props.post.body }}></p>
        </td>
      </tr>
    )
  }
});

export default ThreadTableRow;
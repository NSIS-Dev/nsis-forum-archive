// Dependencies
import React from 'react';

class Post extends React.Component {
  toggleDateFormat(e) {
    e.preventDefault();

    let el = e.target || e.srcElement;
    let htmlText = el.innerHTML;
    let titleAttr = el.getAttribute("title");

    el.innerHTML = titleAttr;
    el.setAttribute("title", htmlText);
  }

  render() {
    return (
      <tr id={'post-' + this.props.post.id} key={this.props.post.id}>
        <td>
          <img src={this.props.post.user.avatar || ""} className="rounded-circle" />
        </td>
        <td>
            <span className="text-primary">{this.props.post.user.name || "(deleted user)"}</span>
            <span id="post-date" className="text-muted small float-right"  title={this.props.post.date_string} onClick={this.toggleDateFormat} style={{cursor:'pointer'}}>{this.props.post.date_relative}</span>
            <p dangerouslySetInnerHTML={{ __html: this.props.post.body }}></p>
        </td>
      </tr>
    )
  }
}

export default Post;

// Dependencies
import { format as prettyDate } from 'pretty-date';

let formatThread = (data) => {

    let posts = data.posts.map( (post) => {
      const d = new Date(post.timestamp * 1000);

      var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };

      var obj = {
        prettydate: prettyDate(d),
        timestamp: post.timestamp,
        date_str: d.toLocaleDateString('en-GB', options),
        id: post.id,
        user: {
          id: post.user.id,
          name: post.user.name,
        },
        body: post.body
      }

      return obj;
    });

    if (data.title !== 'undefined' && data.title !== null) {
      document.title = `${data.title} | NSIS Forum Archive`;
    }

    data = {
      title: data.title,
      thread_id: data.thread_id,
      posts: posts
    }

    return data;
};

export { formatThread };

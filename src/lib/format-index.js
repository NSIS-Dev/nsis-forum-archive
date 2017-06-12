// Dependencies
import { format as prettyDate } from 'pretty-date';

export default function formatIndex(data) {
    let posts = data.map(function(item){
      const d = new Date(item.latest * 1000);

      var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };

      var replies;
      if (item.replies > 0) {
        replies = item.replies + ' replies';
      } else {
        replies = 'No replies';
      }

      var sticky = null;
      if (item.sticky === true) {
        sticky = 'Sticky:';
      }

      var obj = {
        id: item.id,
        prettydate: prettyDate(d),
        timestamp: item.timestamp,
        date_str: d.toLocaleDateString('en-GB', options),
        title: item.title,
        replies_str: replies,
        sticky_str: sticky
      }

      return obj;
    });

    return posts;
}

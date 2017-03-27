// Library
import formatIndex from './format-index';
import formatThread from './format-thread';

export default function setState(that, data) {

    if (data.hasOwnProperty('posts')) {
      data = formatThread(data);
    } else {
      data = formatIndex(data);
    }

    that.setState({
      data: data
    });

}
// Dependencies
import { format as prettyDate } from 'pretty-date';
import Identicon from 'identicon.js';
import sha1 from 'sha1';

let loadData = (data = 'index') => {
  if (data === 'index') {
    return loadIndex(data);
  }

  return loadThread(data);
};

export { loadData };


// Private helper functions
let loadIndex = () => {
  console.time("Data loaded in")

  if (localStorage.getItem('nsis-forum.index') === null) {
    console.log("Loading data from JSON");

    return fetch('./data/index.json')
    .then(checkStatus)
    .then(parseJson)
    .then( (data) => {
      console.timeEnd("Data loaded in");
      localStorage.setItem('nsis-forum.index', JSON.stringify(data));
      return data;
    }).catch( (error) => {
      console.error(error);
    });
  } else {
    console.log("Loading data from localStorage");
    console.timeEnd("Data loaded in");
    document.querySelector('.spinner').style.display = 'none';

    return Promise.resolve(JSON.parse(localStorage.getItem('nsis-forum.index')));
  }
};

let loadThread = (id) => {
  let didLoadUser = [];
  let dataUsers = {};
  let dataThread = {};

  console.time("Data loaded in");

  if (localStorage.getItem('nsis-forum.thread:' + id) === null) {
    console.log("Loading data from JSON");

    return getJSON('./data/threads/' + id + '.json').then( (thread) => {
      dataThread = thread;

      return Promise.all(
        thread.posts.map( (post) => {
          // TODO: move to separate function
          const d = new Date(post.timestamp * 1000);
          let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };

          post.date_relative = prettyDate(d);
          post.date_string = d.toLocaleDateString('en-GB', options);

          if (post.user > 0 && didLoadUser.indexOf(post.user) === -1) {
            didLoadUser.push(post.user);
            return getJSON('./data/users/' + post.user + '.json') ;
          }
        })
      );
    }).then( (users) => {
      users.forEach( (user) => {
        if (typeof user !== 'undefined') {
          dataUsers[user.id] = user;
        }
      });
    }).catch( (err) => {
      // catch any error that happened so far
      console.error(err.message);
    }).then( () => {

      dataThread.posts.map( (post) => {
        if (typeof dataUsers[post.user] !== 'undefined') {
          post.user = dataUsers[post.user];
          post.user.avatar = getAvatar(post.user.name);
        }
      })
      localStorage.setItem('nsis-forum.thread:' + id, JSON.stringify(dataThread));
      console.timeEnd("Data loaded in");

      return dataThread;
    });
  } else {
    console.log("Loading data from localStorage");
    console.timeEnd("Data loaded in");

    return Promise.resolve(JSON.parse(localStorage.getItem('nsis-forum.thread:' + id)));
  }
};

let getAvatar = (str) => {
  let options = {
    // foreground: [255, 255, 255, 255],
    background: [0, 0, 0, 255],
    size: 48,
    format: 'svg',
  };
  let hash = sha1(str);
  let data = new Identicon(hash, options).toString()
  
  return 'data:image/svg+xml;base64,' + data
};

let getJSON = (url) => {
  return fetch(url)
  .then(checkStatus)
  .then(parseJson)
  .then( (data) => {
    return data;
  }).catch( (error) => {
    console.error(error);
  });
};

let checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
};

let parseJson = (response) => {
  return response.json()
};

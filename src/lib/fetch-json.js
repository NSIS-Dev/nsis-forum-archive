// Polyfill, because fuck you Safari!
import 'whatwg-fetch';

// Library
// import didExpire from './did-expire';
import setState from './set-state';

export default function fetchJson(that, thread, isIndex = false) {

    let request = window.location.origin + window.location.pathname + thread;

    that.serverRequest = 
    fetch(request)
    .then(function(response) {
      let contentType = response.headers.get("content-type");

      if(contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function(json) {
          setState(that, json);

          let key;
          if (isIndex === true) {
            key = 'nsis-forum.index';
          } else {
            key = 'nsis-forum.thread:' + json.thread_id;
          }

          json.indexed = Date.now();
          localStorage.setItem(key, JSON.stringify(json));

          // if (localStorage.getItem('nsis-forum.lastUpdate') === null || didExpire() === true) {
          //   localStorage.setItem('nsis-forum.lastUpdate', (new Date).getTime());
          // }
        });
      } else {
        throw "Not Found";
      }
    });

  }
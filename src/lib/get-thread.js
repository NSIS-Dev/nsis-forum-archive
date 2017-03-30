// Dependencies
import { join } from 'path';

// Library
import fetchJson from './fetch-json';
import setState from './set-state';
import didExpire from './did-expire';

export default function getThread(that, thread, isIndex = false) {
  console.time('Data loaded');
  let item;

  // will be localStorage
  if (isIndex === true) {
    item = localStorage.getItem('nsis-forum.index');
  } else {
    item = localStorage.getItem('nsis-forum.thread:' + thread);
  }

  // not saved or older than a month
  if (item === null || didExpire(item, 'weekly') =)= true) {
    console.log('Loading data from JSON file');

    let fileUri;
    if (isIndex === true) {
      fileUri = join(__dirname, '..', 'data', 'index.json');
    } else {
      fileUri = join(__dirname, '..', 'data', 'threads', thread + '.json');
    }

    fetchJson(that, fileUri, isIndex)
  } else {
    console.log('Loading data from localStorage');
    setState(that, JSON.parse(item));
  }

  console.timeEnd('Data loaded');
}

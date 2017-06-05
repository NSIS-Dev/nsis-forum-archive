// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

// Components
import Index from './components/index.jsx';
import Thread from './components/thread.jsx';
import NotFound from './components/404.jsx';

render(
  <Router history={hashHistory}>
    <Route path="/" component={Index} />
    <Route path="/thread/:thread" component={Thread} />
    <Route path="*" component={NotFound} />
  </Router>
  , document.getElementById('app')
);

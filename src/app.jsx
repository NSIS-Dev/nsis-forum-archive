// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, hashHistory } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

// Components
import Index from './components/index.jsx';
import Thread from './components/thread.jsx';
import NotFound from './components/404.jsx';

const routes = (
    <Router history={history}>
      <Switch>
          <Route path="/thread/:thread" component={Thread} />
          <Route path="/" component={Index} />
          <Route path="*" component={NotFound} />
      </Switch>
    </Router>
);

render(routes, document.getElementById('app'));

// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Switch, hashHistory } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

// Components
import Index from './components/index.jsx';
import Thread from './components/thread.jsx';
import NotFound from './components/404.jsx';

const routes = (
    <Router history={history}>
      <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/thread/:thread" component={Thread} />
          <Route path="*" component={NotFound} />
      </Switch>
    </Router>
);

render(routes, document.getElementById('app'));

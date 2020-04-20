import * as React from 'react';
import Routes from './containers/Routes';
import {BrowserRouter as Router} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.css';
const history = createBrowserHistory();
function App() {
  return (
    <Router history={history} >
      <Routes />
    </Router>
  );
}

export default App;

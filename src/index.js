import React from 'react';
import ReactDOM from 'react-dom';
import './styles/home.css';
import './styles/userHome.css'
import * as serviceWorker from './serviceWorker';
import Router from "./router"
import CtxProvider from "./context"


ReactDOM.render(
  <CtxProvider>
    <Router />
  </CtxProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();

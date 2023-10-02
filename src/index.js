import React from 'react';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
const App = React.lazy(() => import('./App'));

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

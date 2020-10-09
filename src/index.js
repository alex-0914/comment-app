import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import CommentApp from './containers/CommentApp';
import commentReducer from './reducers/comments';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(commentReducer);

ReactDOM.render(
  <Provider store={store}>
    <CommentApp/>
  </Provider>,
  document.getElementById("root")
)
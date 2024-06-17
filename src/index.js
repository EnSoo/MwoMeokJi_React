import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MainRouter from './MainRouter';
import RootReducer from './redux/RootReducer';
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'

// 전역 state 저장소 만들기

const store = createStore(RootReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <MainRouter/> 
  // </React.StrictMode>
  <Provider store={store}>
    <MainRouter/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

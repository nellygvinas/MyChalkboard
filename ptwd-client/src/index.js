import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import AdminLanding from './components/landing/AdminLanding';
import Posting from './components/posts/Posting'

ReactDOM.render(
    <BrowserRouter>
        <App />
        {/* <Posting activeTab={1} /> */}
    </BrowserRouter>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

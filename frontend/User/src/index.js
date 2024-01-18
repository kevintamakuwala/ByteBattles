import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { BrowserRouter} from 'react-router-dom';
import "./global.css";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);



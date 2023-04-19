import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import reducers from "./reducers"
import reduxThunk from 'redux-thunk'
import {AuthProvider} from "./context/AuthProvider"

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//OVO DOLAZI OD REDUX DEF TOOLS
const store=createStore(reducers,
   composeEnhancers(applyMiddleware(reduxThunk))
   );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import AppWrapper from './AppWrapper';
//redux related imports
import store from './components/redux/store'
import { Provider } from "react-redux";
import {BrowserRouter} from 'react-router-dom';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
		<AppWrapper></AppWrapper>
		</BrowserRouter>
		{/* <HashRouter>
			<AppWrapper></AppWrapper>
		</HashRouter> */}
	</Provider>
	,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

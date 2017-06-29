import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import * as firebase from 'firebase';
import firebase_config from './firebase-config.js'
import './index.css';

firebase.initializeApp(firebase_config);

function App(props) {
	return (
		<div>
			<MainRoutes></MainRoutes>
		</div>
	)
}

function Header(props) {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link to="/tasks">Tasks</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

function Home(props) {
	return (
		<div>
			<h1>Welcome to Grand Frere</h1>
			<Header></Header>
		</div>
	)
}

function TaskHandler(props) {
	return (
		<div>You reached tasks</div>
	)
}

function MainRoutes(props) {
	return (
		<main>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/tasks" component={TaskHandler}/>
			</Switch>
		</main>
	)
}


ReactDOM.render(
  <BrowserRouter>
  	<App />
  </BrowserRouter>,
  document.getElementById('root')
);

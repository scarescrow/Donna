import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import * as firebase from 'firebase';
import firebase_config from './firebase-config.js'
import './index.css';

firebase.initializeApp(firebase_config);
const database = firebase.database();

function getCategories(callback) {
	database.ref('/categories').once('value', snap => {
		const categories = snap.val();
		var fbCategories = []
		if(categories !== null && categories !== undefined) {
			var sortable = [];
			for(var c in categories) {
				sortable.push([c, categories[c]])
			}
			sortable.sort(function(a, b) {
				return b[1] - a[1];
			})
			for (var i = 0; i < sortable.length; i ++)
				fbCategories.push(sortable[i][0]);
		}
		callback(fbCategories);
	});
}

function CategoryItem(props) {
	var removeStyle = {
		paddingLeft: '80px',
		color:'red'
	}
	return (
		<li>{props.category}<span className="remove" style={removeStyle} onClick={() => props.remove(props.category)}>X</span></li>
	)
}

class Categories extends React.Component {
	constructor() {
		super();
		this.state = {
			categories: []
		}
	}

	fillCategories() {
		getCategories((fbCategories) => {
			this.setState({categories: fbCategories});
			document.getElementById('addCategoryInput').focus();
		});
	}

	removeCategory(category) {
		database.ref('/categories/' + category).remove().catch((error) => {
			console.log("There was an error while deleting category '" + category + "': " + error);
		});
	}

	watchCategory() {
		database.ref('/categories').on('child_removed', (snap) => {
			this.fillCategories();
		});
		database.ref('/categories').on('child_added', (snap) => {
			this.fillCategories();
		})
	}

	componentDidMount() {
		this.fillCategories();
		this.watchCategory();
	}

	addCategory() {
		var category = document.getElementById('addCategoryInput').value;
		var priority = document.getElementById('addPriorityInput').value;
		if(category === "" || priority === "")
			return;
		var category_item = {}
		category_item[category] = priority
		database.ref('/categories').update(category_item).then(() => {
			document.getElementById('addCategoryInput').value = "";
			document.getElementById('addPriorityInput').value = "";
		}).catch((error) => {
			console.log("There was an error while updating categories in Firebase: " + error);
		});
	}

	_handleKeyPress(e) {
		if(e.key === 'Enter') {
			this.addCategory();
		}
	}

	render() {
		var categoryTags = [];
		this.state.categories.forEach((item, i) => {
			categoryTags.push(<CategoryItem key={i} category={item} remove={this.removeCategory}></CategoryItem>)
		});
		return (
			<div className="categoryList">
				<h3>Current Categories</h3>
				<ul>
					{categoryTags}
				</ul>
				<input type="text" id="addCategoryInput" placeholder="Add Category" />
				<input type="text" id="addPriorityInput" placeholder="Priority" onKeyPress={(e) => this._handleKeyPress(e)}/>
				<button type="button" onClick={() => this.addCategory()}>Add</button>
			</div>
		);
	}
}

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
			<Categories></Categories>
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

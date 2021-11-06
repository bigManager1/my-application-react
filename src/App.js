
import './Styling/App.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Home from'./Components/Home.js';
import Users from'./Components/Users.js';
import Overview from'./Components/Overview.js';
import ManageOptions from'./Components/ManageOptions.js';

function App() {
  return (
    <div id="main">
      <Router>
        <Route path='/:page' component={Navigation} />
        <Route exact path='/' component={Navigation} />
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/users' component={Users} />
        <Route exact path='/overview' component={Overview} />
        <Route exact path='/manageOptions' component={ManageOptions} />
      </Router>
    </div>
  );
}

export default App;

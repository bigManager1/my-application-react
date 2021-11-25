
import './Styling/App.scss'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Home from'./Components/Home.js';
import Users from'./Components/Users.js';
import PurchaseOverview from'./Components/Purchase/Overview.js';
import ManagePurchaseOptions from'./Components/Purchase/ManageOptions.js';
import ProductionOverview from'./Components/Production/Overview.js';
import ManageProductionOptions from'./Components/Production/ManageOptions.js';
import SalesOverview from'./Components/Sales/Overview.js';
import ManageSalesOptions from'./Components/Sales/ManageOptions.js';
import "./Styling/Navbar.scss";

function App() {
  return (
    <div class="full">
      <Router>
<<<<<<< HEAD
=======
         {/*added Routes here, though worked just fine before*/}
>>>>>>> ec60f5b41f2aee05ab445d4e3f0f3d98bb3528b4
        <Route path='/:page' component={Navigation} />
        <Route exact path='/' component={Navigation} />
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/users' component={Users} />
        <Route exact path='/purchaseOverview' component={PurchaseOverview} />
        <Route exact path='/managePurchaseOptions' component={ManagePurchaseOptions} />
        <Route exact path='/productionOverview' component={ProductionOverview} />
        <Route exact path='/manageProductionOptions' component={ManageProductionOptions} />
        <Route exact path='/salesOverview' component={SalesOverview} />
        <Route exact path='/manageSalesOptions' component={ManageSalesOptions} />
      </Router>
    </div>
  );
}
<<<<<<< HEAD
export default App;

=======

export default App;
>>>>>>> ec60f5b41f2aee05ab445d4e3f0f3d98bb3528b4

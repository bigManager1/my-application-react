import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons'
//Navigation bar where all choices are presented in the purchase interface
const Navigation = () => {
  // icons
  const home = <FontAwesomeIcon icon={faHome} />
  const users = <FontAwesomeIcon icon={faUsers} />
    return (
      <div>
        <Link to="/home"><button id="navButton">{home}</button></Link>
        <Link to="/users"><button id="navButton">{users}</button></Link>
        <Link to="/purchaseOverview"><button id="navButton">Purchase overview</button></Link>
        <Link to="/managePurchaseOptions"><button id="navButton">Manage Purchase Options</button></Link>
        <Link to="/productionOverview"><button id="navButton">Production Overview</button></Link>
        <Link to="/manageProductionOptions"><button id="navButton">Manage Production Options</button></Link>
        <Link to="/salesOverview"><button id="navButton">Sales overview</button></Link>
        <Link to="/manageSalesOverview"><button id="navButton">Manage Sales Overview</button></Link>
      </div>
    );
  };
  
  export default Navigation;
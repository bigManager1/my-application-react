import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faEnvelope, faComment, faInbox, faFileDownload, faDownload } from '@fortawesome/free-solid-svg-icons';
import "./Styling/Navbar.scss";
//Navigation bar where all choices are presented in the purchase interface

// good optionals

// send emails for externals
// send chats for internals
// look in inbox for internal chats
// download a report (choose from API)



const Navigation = () => {
  // icons
  const home = <FontAwesomeIcon icon={faHome} />
  const users = <FontAwesomeIcon icon={faUsers} />
  const message = <FontAwesomeIcon icon={faComment} />
  const email = <FontAwesomeIcon icon={faEnvelope} />
  const inbox = <FontAwesomeIcon icon={faInbox} />
  const download = <FontAwesomeIcon icon={faDownload} />

  const weekdays= ["Monday","Tuesday", "Wednesday", "Thursday","Friday","Saturday","Sunday"]
  // variables
  const currentDate = new Date();
  var year = String(currentDate.getFullYear());
  var weekday = String(weekdays[currentDate.getDay()-1]);
  var day = String(currentDate.getDate()).padStart(2, '0');
  var month = String(currentDate.getMonth()+1).padStart(2, '0');
  var displayDate = weekday + " " + day + "/" +month + "/" +year;


    return (
      <div class="navigation">
        <div class="upper">
        <Link to="/home"><button class="navButton" id="small">{home}</button></Link>
        <Link to="/users"><button class="navButton" id="small">{users}</button></Link>
        <Link to="/purchaseOverview"><button class="navButton">Purchase Overview</button></Link>
        <Link to="/managePurchaseOptions"><button class="navButton">Purchase Options</button></Link>
        <Link to="/productionOverview"><button class="navButton">Production Overview</button></Link>
        <Link to="/manageProductionOptions"><button class="navButton">Production Options</button></Link>
        <Link to="/salesOverview"><button class="navButton">Sales Overview</button></Link>
        <Link to="/manageSalesOverview"><button class="navButton">Sales Options</button></Link>
        </div>
        <div class="lower">
          <span class="details">{displayDate}</span>
          
          <button class="navButton" id="Wsmall">{download}</button>
          <button class="navButton" id="Wsmall">{email}</button>
          <button class="navButton" id="Wsmall">{message}</button>
          <button class="navButton" id="Wsmall">{inbox}</button>
        </div>
      </div>
    );
  };
  
  export default Navigation;



  
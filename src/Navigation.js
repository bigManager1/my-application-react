import { Link } from 'react-router-dom';

const NavLink = ({ page }) => {
  const title = page.charAt(0).toUpperCase() + page.slice(1);

  return <Link to={`/${page}`}>{title}</Link>;
};

//Navigation bar where all choices are presented in the purchase interface
const Navigation = () => {
    return (
      <div>
        <NavLink page='home' />
        <NavLink page='users' />
        <NavLink page='overview' />
        <NavLink page='manageOptions' />
      </div>
    );
  };
  
  export default Navigation;
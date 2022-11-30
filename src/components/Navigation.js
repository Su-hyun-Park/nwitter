import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
  <nav>
    <ul>
      <li>
        <Link to="/">{userObj.displayName}의 Home</Link>
      </li>     
      <li>
        <Link to="/profile">{userObj.displayName}의 Profile</Link>
      </li>          
    </ul>          
  </nav>  
  );
};

export default Navigation;
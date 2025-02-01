import {Link } from "react-router-dom";
import Test from "./test";
const Header = ()=>{
    return( <div className=""> 
        <nav>
        <ul className="flex space-x-4">
  <li>
    <Link to={'/home'} className="bg-gray-100 px-3 mx-2">Home</Link>
  </li>
  <li>
    <Link to={'/about'} className="bg-gray-100 px-3 mx-2">About</Link>
  </li>
  <li>
    <Link to={'/contact'} className="bg-gray-100 px-3 mx-2">Contact</Link>
  </li>
</ul>
        </nav>
        
         </div> );
}
export default Header;
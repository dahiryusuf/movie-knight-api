import React from "react";
import { Link } from "react-router-dom";


export const LandingHeader = () => {
  return (
    <header className = 'headers'>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            MovieKnight
          </div>
<ul className="nav-links">
<li>
          <Link to="/signup">Sign Up</Link>
          </li>

<li>

            
            <Link to="/signin">Sign In</Link>
     
            </li>        
         
            </ul>
        </div>
      </div>
    </header>
  );
};
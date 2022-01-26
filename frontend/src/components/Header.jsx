import React from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";


export const Header = () => {
  return (
    <header className = 'headers'>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
           <Link to="/home">   MovieKnight</Link>
          </div>

          <ul className="nav-links">
            <li>
            <Link to="/watchlist">  Watch List</Link>
            </li>

            <li>
            <Link to="/watchparties">  Watch Parties</Link>
            </li>

            <li className="btn btn-main">
           
            <Link to="/newparty">New Party</Link>
     


             
            </li>
          </ul>
          
        </div>
      </div>
 
    </header>
  );
};
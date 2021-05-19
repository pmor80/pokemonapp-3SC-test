import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="wrapper header">
      <div className="container">
        <NavLink to="/" activeClassName="selected">
          Pokemon App
        </NavLink>
        {''}
        <NavLink to="/favourites" activeClassName="selected">
          Favourites
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

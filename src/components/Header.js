import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="wrapper header">
      <div className="container">
        <NavLink to="/" activeClassName="selected" exact>
          Pokemon App
        </NavLink>
        {''}
        <NavLink to="/favourites" activeClassName="selected" exact>
          Favourites
        </NavLink>
        {''}
        <NavLink to="/compare" activeClassName="selected" exact>
          Compare Stats
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

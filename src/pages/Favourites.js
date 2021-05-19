import React from 'react';
import List from '../components/List';

const Favourites = () => {
  return (
    <div className="favourites">
      <div className="container">
        <h2>Favourite Pokemons</h2>
      </div>
      <List isFavourite />
    </div>
  );
};

export default Favourites;

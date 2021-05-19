import React, { useContext } from 'react';

import StateContext from '../StateContext';
import ListItem from './ListItem';

const List = props => {
  const appState = useContext(StateContext);
  let results = [];

  if (props.isFavourite) {
    results = appState.favourites;
    if (results.length === 0) {
      return (
        <div className="container">
          <p>No results</p>
        </div>
      );
    }
  } else {
    results = appState.searchResults;
  }

  return (
    <div className="container">
      <ul className="list">
        {results.map(pokemon => {
          return (
            <ListItem
              name={pokemon.name}
              key={pokemon.name}
              url={pokemon.url}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default List;

import React, { useContext } from 'react';

import StateContext from '../StateContext';
import ListItem from './ListItem';

const List = props => {
  const appState = useContext(StateContext);

  return (
    <div className="container">
      <ul className="list">
        {appState.searchResults.map(pokemon => {
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

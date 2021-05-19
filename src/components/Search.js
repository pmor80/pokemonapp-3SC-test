import React, { useEffect, useContext } from 'react';

import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

const Search = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const handleInputChange = event => {
    appDispatch({
      type: 'updateSearchTerm',
      value: event.target.value
    });
  };

  useEffect(() => {
    const results = appState.results.filter(item =>
      item.name.toLowerCase().includes(appState.searchTerm)
    );
    appDispatch({
      type: 'updateSearchResults',
      value: results
    });
  }, [appState.searchTerm, appState.allData]);

  return (
    <div className="search container">
      <label>Search:</label>
      <input
        type="text"
        placeholder="Search"
        value={appState.searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;

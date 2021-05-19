import React, { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

import Home from './pages/Home';

import './App.css';

function App() {
  const initialState = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
    allData: {},
    results: [],
    prevURL: null,
    nextURL: null,
    searchTerm: '',
    searchResults: []
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'fetchData':
        draft.allData = action.data;
        draft.results = action.data.results;
        draft.prevURL = action.data.previous;
        draft.nextURL = action.data.next;
        return;
      case 'updateSearchTerm':
        draft.searchTerm = action.value;
        return;
      case 'updateSearchResults':
        draft.searchResults = action.value;
        return;
      default:
        return state;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchData() {
      try {
        const response = await Axios.get(state.url);
        dispatch({
          type: 'fetchData',
          data: response.data
        });
        console.log('fetching OK');
      } catch (e) {
        console.log('There was a problem fetching data.');
      }
    }
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  return (
    <div className="app">
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
            </Switch>
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;

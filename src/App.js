import React, { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

// My pages
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import ViewSingle from './pages/ViewSingle';

// My componens
import Header from './components/Header';

import './App.css';

function App() {
  const initialStateFavourites = Boolean(
    localStorage.getItem('favouritePokemons')
  )
    ? JSON.parse(localStorage.getItem('favouritePokemons'))
    : [];

  const initialState = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
    allData: {},
    results: [],
    favourites: initialStateFavourites,
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
      case 'addToFavourites':
        return {
          ...draft,
          favourites: [...draft.favourites, action.data]
        };
      case 'removeFromFavourites':
        return {
          ...draft,
          favourites: [
            ...draft.favourites.filter(item => item.name !== action.name)
          ]
        };
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

  useEffect(() => {
    localStorage.removeItem('favoritePokemons');
    localStorage.setItem('favoritePokemons', JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <div className="app">
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/favourites" exact>
                <Favourites />
              </Route>
              <Route path="/pokemon/:id" exact>
                <ViewSingle />
              </Route>
            </Switch>
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;

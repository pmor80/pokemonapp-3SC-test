import React, { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';

import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

import './App.css';

function App() {
  const initialState = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
    allData: {},
    results: [],
    prevURL: null,
    nextURL: null
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'fetchData':
        draft.allData = action.data;
        draft.results = action.data.results;
        draft.prevURL = action.data.previous;
        draft.nextURL = action.data.next;
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
          <ul>
            {state.results.map(item => (
              <li>{item.name}</li>
            ))}
          </ul>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;

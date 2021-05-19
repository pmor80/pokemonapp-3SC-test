import React, { useContext } from 'react';
import Axios from 'axios';

import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';

import Button from './Button';

const Pagination = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const fetchPreviousSetHandler = async () => {
    try {
      const response = await Axios.get(appState.prevURL);
      appDispatch({
        type: 'fetchData',
        data: response.data
      });
      console.log('fetching Previous Set OK');
    } catch (e) {
      console.log('There was a problem fetching previous data set.');
    }
  };

  const fetchNextSetHandler = async () => {
    try {
      const response = await Axios.get(appState.nextURL);
      appDispatch({
        type: 'fetchData',
        data: response.data
      });
      console.log('fetching Next Set OK');
    } catch (e) {
      console.log('There was a problem fetching next data set.');
    }
  };

  return (
    <div className="pagination container">
      <Button
        onButtonClickHandler={fetchPreviousSetHandler}
        disabledState={!appState.prevURL}>
        Prev
      </Button>
      <Button onButtonClickHandler={fetchNextSetHandler}>Next</Button>
    </div>
  );
};

export default Pagination;

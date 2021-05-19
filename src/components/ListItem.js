import React, { useContext } from 'react';
import StateContext from '../StateContext';
import { Link } from 'react-router-dom';

const ListItem = props => {
  const appState = useContext(StateContext);

  const baseURL = appState.url;
  const resourceURL = props.url;
  let id = resourceURL.replace(baseURL, '').slice(0, -1);

  return (
    <li>
      <Link to={`/pokemon/${id}`}>{props.name}</Link>
    </li>
  );
};

export default ListItem;

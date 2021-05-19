import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

const ViewSingle = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchData() {
      try {
        const response = await Axios.get(`${appState.url}${id}/`);
        setPost(response.data);

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
    <div className="container single">
      <h2 className="name">{post.name}</h2>
    </div>
  );
};

export default ViewSingle;

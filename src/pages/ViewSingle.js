import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

import LoadingDotsIcon from '../components/LoadingDotsIcon';
import Button from '../components/Button';

const ViewSingle = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const [post, setPost] = useState({});
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState();
  const [isCompared, setIsCompared] = useState();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchData() {
      try {
        const response = await Axios.get(`${appState.url}${id}/`);
        setPost(response.data);
        setIsLoading(false);
        // set local state to check if element if favourite
        if (
          appState.favourites.filter(item => item.name === response.data.name)
            .length > 0
        ) {
          setIsFavourite(true);
        } else {
          setIsFavourite(false);
        }
        // set local state to check if element is in compared list
        if (
          appState.compare.filter(item => item.name === response.data.name)
            .length > 0
        ) {
          setIsCompared(true);
        } else {
          setIsCompared(false);
        }

        console.log('fetching OK');
      } catch (e) {
        console.log('There was a problem fetching data.');
      }
    }
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, [appState.favourites, appState.compare, appState.url, id]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    const isFavouriteHandler = () => {
      if (
        appState.favourites.filter(item => item.name === post.name).length > 0
      ) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
    };

    isFavouriteHandler();

    return () => {
      ourRequest.cancel();
    };
  }, [appState.favourites, post.name]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    const isComparedHandler = () => {
      if (appState.compare.filter(item => item.name === post.name).length > 0) {
        setIsCompared(true);
      } else {
        setIsCompared(false);
      }
    };

    isComparedHandler();

    return () => {
      ourRequest.cancel();
    };
  }, [appState.compare, post.name]);

  const addToFavouritesHandler = () => {
    appDispatch({
      type: 'addToFavourites',
      data: { name: post.name, url: appState.url + id + '/' }
    });
  };

  const removeFromFavouritesHandler = () => {
    appDispatch({
      type: 'removeFromFavourites',
      name: post.name
    });
  };

  const addToCompareHandler = () => {
    appDispatch({
      type: 'addToCompare',
      data: { name: post.name, stats: post.stats }
    });
  };

  const removeFromCompareHandler = () => {
    appDispatch({
      type: 'removeFromCompare',
      name: post.name
    });
  };

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="container single">
      <div className="pagination">
        <Button
          onButtonClickHandler={addToFavouritesHandler}
          disabledState={isFavourite}>
          Add to Favourites
        </Button>

        <Button
          onButtonClickHandler={removeFromFavouritesHandler}
          disabledState={!isFavourite}>
          Remove from Favourites
        </Button>
      </div>
      <h2 className="name">{post.name}</h2>

      <div className="image-wrapper">
        <img src={post.sprites.front_default} alt="" />
      </div>

      <table className="stats">
        <thead>
          <tr>
            <td></td>
            <td>Base Stat</td>
            <td>Efford</td>
          </tr>
        </thead>
        <tbody>
          {post.stats.map(item => (
            <tr key={item.stat.name}>
              <td>{item.stat.name}</td>
              <td>{item.base_stat}</td>
              <td>{item.effort}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!isCompared && appState.compare.length < 2 && (
        <div className="pagination">
          <Button
            onButtonClickHandler={addToCompareHandler}
            disabledState={isCompared}>
            Compare {post.name}
          </Button>

          <Button
            onButtonClickHandler={removeFromCompareHandler}
            disabledState={!isCompared}>
            Stop Comparing
          </Button>
        </div>
      )}

      {isCompared && (
        <div className="pagination">
          <Button
            onButtonClickHandler={addToCompareHandler}
            disabledState={isCompared}>
            Compare {post.name}
          </Button>

          <Button
            onButtonClickHandler={removeFromCompareHandler}
            disabledState={!isCompared}>
            Stop Comparing
          </Button>
        </div>
      )}
    </div>
  );
};

export default ViewSingle;

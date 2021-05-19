import React from 'react';

import Search from '../components/Search';
import List from '../components/List';
import Pagination from '../components/Pagination';

const Home = () => {
  return (
    <div className="page-container">
      <div className="container">
        <h2>Pokemon API List</h2>
      </div>
      <Search />
      <List />
      <Pagination />
    </div>
  );
};

export default Home;

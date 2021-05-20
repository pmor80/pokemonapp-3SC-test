import React, { useContext } from 'react';
import StateContext from '../StateContext';

const Compare = () => {
  const appState = useContext(StateContext);

  if (appState.compare.length < 2) {
    return (
      <div className="container">
        <p>Select 2 Pokemons for Comparison</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="container">
        <h2>Compare Pokemons Stats</h2>
        <div>
          {appState.compare.map(item => (
            <div key={item.name}>
              <h4>{item.name}</h4>
              <table className="stats">
                <thead>
                  <tr>
                    <td></td>
                    <td>Base Stat</td>
                    <td>Efford</td>
                  </tr>
                </thead>
                <tbody>
                  {item.stats.map(el => (
                    <tr key={el.stat.name}>
                      <td>{el.stat.name}</td>
                      <td>{el.base_stat}</td>
                      <td>{el.effort}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compare;

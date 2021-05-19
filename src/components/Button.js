import React from 'react';

const Button = props => {
  return (
    <button
      onClick={props.onButtonClickHandler}
      disabled={props.disabledState}
      className="btn">
      {props.children}
    </button>
  );
};

export default Button;

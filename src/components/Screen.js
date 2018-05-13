import React from 'react';
import PropTypes from 'prop-types';
//<ScreenRow className='output-screen' value={props.answer}/>

function Screen(props) {
  return (
    <h1>{props.screenValue}</h1>
  );
}

export default Screen;

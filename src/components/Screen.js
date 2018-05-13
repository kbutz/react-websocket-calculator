import React from 'react';
import PropTypes from 'prop-types';
//<ScreenRow className='output-screen' value={props.answer}/>

function Screen(props) {
  return (
    <div className="screen row">
      <input className="row col-xs-12" type="text" readOnly value={props.screenValue}/>
    </div>
  );
}

Screen.propTypes = {
  value: PropTypes.string,
};

export default Screen;

import React, { useState, setState } from 'react';
import ArrayGpio from 'array-gpio';

const Lamp = () => {

	let led23 = r.out(23), led24 = r.out(24);

	function handleOnClick() {
		led23.on();
		led24.on();
  }

	function handleOffClick() {
		led23.off();
		led24.off();
  }

	return ReactDOM.createPortal(
    <button onClick={handleOnClick}>
      Lamp On
    </button>
    <button onClick={handleOffClick}>
      Lamp Off
    </button>

   <div className="lamp-container">
      <div className="lamp">
        <h2>Modal is cool </h2>
        <p>This is a modal in React</p>
      </div>
    </div>,
    document.querySelector('.modal-wrapper')
  );

};

export default Lamp;

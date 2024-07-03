import React, { useState } from 'react';

const Rechetu = ({ name, value, onChange, checked}) => {
 

  return (
    <div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name={name}
          value={value}
          checked={ checked}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor={value}>
        {value}
        </label>
      </div>
    </div>
  );
};


export default Rechetu;

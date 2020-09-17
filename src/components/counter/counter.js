import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './counter.scss';

function Counter({ defaultValue, min, max, cb }) {
  const [count, setCount] = useState(defaultValue);

  const handleIncrement = ({ target: { value } }, cb) => {
    setCount((prevCount) => {
      const result = prevCount + 1;
      cb(result);

      return result;
    });
  };

  const handleDecrement = ({ target: { value } }, cb) => {
    setCount((prevCount) => {
      const result = prevCount - 1;
      cb(result);

      return result;
    });
  };

  const handleChange = ({ target: { value } }, cb) => {
    const number = parseInt(value) || 0;

    if (number >= max) {
      setCount(max);
    } else if (number <= min) {
      setCount(min);
    } else {
      setCount(number);
    }

    cb(value);
  };

  const handleWheel = (event, cb) => {
    const delta = event.deltaY || event.detail || event.wheelDelta;

    if (delta > 0) {
      setCount((prevCount) => {
        const result = prevCount + 1;
        cb(result);

        return result;
      });
    } else {
      setCount((prevCount) => {
        const result = prevCount - 1;
        cb(result);

        return result;
      });
    }
  };

  return (
    <div className="input-group Counter">
      <div className="input-group-prepend">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={(event) => handleDecrement(event, cb)}
        >
          -
        </button>
      </div>
      <input
        type="number"
        className="form-control"
        value={count}
        min={min}
        max={max}
        onChange={(event) => handleChange(event, cb)}
        onWheel={(event) => handleWheel(event, cb)}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={(event) => handleIncrement(event, cb)}
        >
          +
        </button>
      </div>
    </div>
  );
}

Counter.defaultProps = {
  defaultValue: 1,
  min: -100,
  max: 100,
  cb: (value) => console.log(value),
};

Counter.propTypes = {
  defaultValue: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  cb: PropTypes.func.isRequired,
};

export default Counter;

import * as React from "react";
import PropTypes from "prop-types";


/**
 * This control is used to input a page number to go to:
 * - value/setValue refers to the page number to go to. 
 * - error/setError refers an error message to be displayed below the page number. 
 * - maxNum is the maximum page number that can be set to.
 * To control the number, use - and + button to decrement and increment.  
 * User can also directly key in hte page number.
 */

export const NumberControl = ( {value, setValue, error, setError, maxNum} ) => {

  return (
    <div className="mt-1 sm:mt-0 sm:col-span-2">
      <div className="relative w-32">
        <button
          type="button"
          className="absolute left-0 inset-y-0 px-1.5 text-gray-400"
          onClick={() => {
            if (value > 1) {
              setError("");
              setValue(value - 1);
            } else {
              setError("Must be at least 1");
            }
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
          </svg>
        </button>
        <input
          type="text"
          name="headcount"
          required
          className="block w-full px-9 text-center shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
          value={value}
          onChange={(ev) => {
            setError("");
            if (Number(ev.target.value)<1) {
              setValue(1);
              setError("Must be at least 1");
            } else if (Number(ev.target.value)>maxNum) {
              setValue(maxNum);
              setError(`Must not exceed ${maxNum}`);
            } else {
              setValue(Number(ev.target.value));
            }
          }}
        />
        <button
          type="button"
          className="absolute right-0 inset-y-0 px-1.5 text-gray-400"
          onClick={() => {
            setError("");
            if (value < maxNum) {
              setError("");
              setValue(value + 1);
            } else {
              setError(`Must not exceed ${maxNum}`);
            }

          }}
        >
          <svg
            className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </button>
      </div>
      {error && <div className="text-red-500 text-xs pt-1">{error}</div>}
    </div>
  );
};

NumberControl.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func,
  error: PropTypes.string,
  setError: PropTypes.func,
  maxNum: PropTypes.number
};


import React from 'react';
import PropTypes from 'prop-types';

const ExertionSelect = props => (
  <select onChange={props.onChange}>
    <option>Extertion</option>
    <option value="low">low</option>
    <option value="moderate">moderate</option>
    <option value="high">high</option>
  </select>
);

ExertionSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ExertionSelect;

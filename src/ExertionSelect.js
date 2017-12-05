import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';

class ExertionSelect extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  render() {
    return (
      <select onChange={this.props.onChange}>
        <option>Extertion</option>
        <option value="low">low</option>
        <option value="moderate">moderate</option>
        <option value="high">high</option>
      </select>
    );
  }

}

export default ExertionSelect;

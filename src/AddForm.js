import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { addDatesToLocation, addBlock } from './Actions';
import LocationSelect from './LocationSelect';
import ExertionSelect from './ExertionSelect';
import moment from 'moment-es6';

class AddForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    addBlock: PropTypes.func.isRequired,
  }

  onLocationChange = (event) => {
    this.setState({
      location: parseInt(event.target.value, 10)
    });
  };

  onExertionChange = (event) => {
    this.setState({
      exertionLevel: event.target.value
    });
  };

  onTimeChange = (event) => {
    this.setState({
      time: event.target.value
    });
  };

  onMinutesChange = (event) => {
    this.setState({
      minutes: parseInt(event.target.value, 10),
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const time = moment(this.state.time, 'HH:mm');
    this.props.addBlock(this.state.location, this.state.exertionLevel, parseInt(time.format('X'), 10), this.state.minutes);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="time" onChange={this.onTimeChange} />
        <input type="number" onChange={this.onMinutesChange} placeholder="minutes" />
        <LocationSelect onChange={this.onLocationChange}/>
        <ExertionSelect onChange={this.onExertionChange} />
        <button onClick={this.onSubmit} disabled={!this.state.location || !this.state.exertionLevel || !this.state.time}>
          Add
        </button>
      </form>
    );
  }

}

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => ({
  addBlock: (dates, locationId, time, minutes) => { dispatch(addBlock(dates, locationId, time, minutes)); }
});


export default connect(mapStateToProps, mapDispatchToProps)(AddForm);

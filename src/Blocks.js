import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { addDatesToLocation, addBlock } from './Actions';
import LocationSelect from './LocationSelect';
import ExertionSelect from './ExertionSelect';
import moment from 'moment-es6';

class Blocks extends Component {
  static propTypes = {
    blocks: PropTypes.arrayOf(PropTypes.shape({
      locationId: PropTypes.number.isRequired,
      exertion: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
    })).isRequired,
    locations: PropTypes.array,
  }

  getLocationName(id) {
    return this.props.locations.find((location) => location.id === id).name;
  }

  getAirQuality(id) {
    return this.props.locations.find((location) => location.id === id).dates[0].airQuality.toLowerCase();
  }

  getBackgroundColor(exertion) {
    switch (exertion) {
      case 'low':
        return '#ffddff';
      case 'moderate':
        return '#ddffff';
      case 'high':
        return '#ffffdd';
    }
  }

  getBlockHeight(block) {
    return block.minutes < 50 ? 50 : block.minutes;
  }


  getBlockClassNames(block) {
    return `block ${this.getAirQuality(block.locationId)}`
  }

  getIcon(block) {
    switch (block.exertion) {
      case 'low':
        return '/images/walking.svg';
      case 'moderate':
        return '/images/jogging.svg';
      case 'high':
        return '/images/running.svg';

    }
  }

  render() {
    return (
      <div>
        {this.props.blocks.sort((a,b) => {
          if (a.time < b.time) { return -1; }
          else if (a.time > b.time) { return 1; }
          return 0;
        }).map((block, index) => (
          <div className={this.getBlockClassNames(block)} key={index} style={{height: this.getBlockHeight(block), marginTop: 5}}>
            <img src={this.getIcon(block)} style={{height: 40, float: 'right'}} />
            {moment.unix(block.time).format('h:mm a')} in {this.getLocationName(block.locationId)}, {block.minutes} minutes
            <br/>
            Air quality: {this.getAirQuality(block.locationId)}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.blocks,
  locations: state.locations,
});

export default connect(mapStateToProps)(Blocks);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-es6';

class Blocks extends Component {
  static propTypes = {
    blocks: PropTypes.arrayOf(PropTypes.shape({
      locationId: PropTypes.number.isRequired,
      exertion: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
    })).isRequired,
    locations: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
  }

  getLocationName(id) {
    return this.props.locations.find(location => location.id === id).name;
  }

  getAirQuality(id) {
    return this.props.locations.find(location => location.id === id)
      .dates[0].airQuality.toLowerCase();
  }

  getBlockHeight(block) {
    return block.minutes < 50 ? 50 : block.minutes;
  }


  getBlockClassNames(block) {
    return `block ${this.getAirQuality(block.locationId)}`;
  }

  getIcon(block) {
    switch (block.exertion) {
      case 'low':
        return '/images/walking.svg';
      case 'moderate':
        return '/images/jogging.svg';
      case 'high':
        return '/images/running.svg';
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        {this.props.blocks.sort((a, b) => {
          if (a.time < b.time) { return -1; } else if (a.time > b.time) { return 1; }
          return 0;
        }).map((block, index) => (
          <div
            className={this.getBlockClassNames(block)}
            key={index}
            style={{ height: this.getBlockHeight(block) }}
          >
            <img alt={`${block.exertion} exertion`} src={this.getIcon(block)} style={{ height: 40 }} />
            {moment.unix(block.time).format('h:mm a')} in {this.getLocationName(block.locationId)}, {block.minutes} minutes
            <br />
            Air quality: {this.getAirQuality(block.locationId)}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  blocks: state.blocks,
  locations: state.locations,
});

export default connect(mapStateToProps)(Blocks);

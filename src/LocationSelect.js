import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDatesToLocation } from './Actions';

class LocationSelect extends React.Component {
  static propTypes = {
    locations: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
    addDates: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onChange = (event) => {
    this.props.onChange(event);
    this.fetchLocationAirQuality(event);
  }

  fetchLocationAirQuality = (event) => {
    const { value } = event.target;
    const url = `/rss/forecast/${value}.xml`;
    fetch(url).then(response => response.text()).then((text) => {
      const parser = new DOMParser();
      const rss = parser.parseFromString(text, 'text/xml');
      const description = rss.querySelector('item > description');
      const html = parser.parseFromString(description.textContent, 'text/html');

      const dates = [];
      const regexp = /(\d{2}\/\d{2}\/\d{4}):\s*(\w+)/g;
      html.querySelectorAll('td').forEach((td) => {
        const { textContent } = td;
        let match = regexp.exec(textContent);
        while (match !== null) {
          dates.push({
            date: match[1],
            airQuality: match[2],
          });
          match = regexp.exec(textContent);
        }
      });
      this.props.addDates(dates, parseInt(value, 10));
    });
  }

  render() {
    return (
      <select onChange={this.onChange}>
        <option>Location</option>
        {this.props.locations.map(location => (
          <option key={location.id} value={location.id}>{location.name}</option>
        ))}
      </select>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations,
});

const mapDispatchToProps = dispatch => ({
  addDates: (dates, locationId) => { dispatch(addDatesToLocation(dates, locationId)); },
});


export default connect(mapStateToProps, mapDispatchToProps)(LocationSelect);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import BaseWidget from '../base';
import { weatherFetch } from '../../../actions';

const ICON_MAPPING = {
  'clear-day': 'wi-day-sunny',
  'clear-night': 'wi-night-clear',
  'rain': 'wi-rain',
  'snow': 'wi-snow',
  'sleet': 'wi-sleet',
  'wind': 'wi-windy',
  'fog': 'wi-fog',
  'cloudy': 'wi-cloudy',
  'partly-cloudy-day': 'wi-day-cloudy',
  'partly-cloudy-night': 'wi-night-alt-cloudy',
}

class WeatherWidget extends BaseWidget {
  componentDidMount() {
    const { location, dispatch } = this.props
    dispatch(weatherFetch(location));
  }

  widgetContent() {
    const { temperature, humidity, high, low, icon, location } = this.props;
    const styles = require('./style.scss');
    let wiIcon = ICON_MAPPING[icon] || 'wi-na'; // Add a fallback in case they add new things.
    return (
      <div className={styles.widget}>
        <table>
          <tbody>
            <tr>
              <td>
                <div className={styles.icon}><i className={'wi ' + wiIcon}></i></div>
                <div>
                  <span className={styles.high}>{Math.round(high)}<i className="wi wi-degrees"></i></span>
                  &nbsp;
                  <span className={styles.low}>{Math.round(low)}<i className="wi wi-degrees"></i></span>
                </div>
              </td>
              <td className={styles.location}><i className={'fa ' + {home: 'fa-home', sf: 'fa-building-o'}[location]}></i></td>
            </tr>
            <tr>
              <td className={styles.temperature}>{Math.round(temperature)}<i className="wi wi-degrees"></i></td>
              <td className={styles.humidity}>{Math.round(humidity * 100.0)}<i className="wi wi-humidity"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

WeatherWidget.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
}

WeatherWidget = connect((state, props) => state.weather[props.location])(WeatherWidget)

export default WeatherWidget

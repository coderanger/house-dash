import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import BaseWidget from '../base';
import { weatherFetch } from '../../../actions';

class WeatherWidget extends BaseWidget {
  componentDidMount() {
    const { location, dispatch } = this.props
    dispatch(weatherFetch(location));
  }

  widgetContent() {
    const { temperature, humidity, high, low, icon, location } = this.props;
    const styles = require('./style.scss');
    return (
      <div className={styles.widgetWeather}>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="widget-weather-forecast"><i className="wi wi-cloudy"></i></div>
                <div className="widget-weather-temp">
                  <span className={styles.widgetWeatherHigh}>{Math.round(high)}<i className="wi wi-degrees"></i></span>
                  {'/'}
                  <span className={styles.widgetWeatherLow}>{Math.round(low)}<i className="wi wi-degrees"></i></span>
                </div>
              </td>
              <td className={styles.widgetWeatherLocation}><i className={'fa ' + {home: 'fa-home', sf: 'fa-building-o'}[location]}></i></td>
            </tr>
            <tr>
              <td>{Math.round(temperature)}<i className="wi wi-degrees"></i></td>
              <td>{Math.round(humidity * 100.0)}<i className="wi wi-humidity"></i></td>
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

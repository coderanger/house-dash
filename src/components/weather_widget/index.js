import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { weatherFetch } from '../../actions';

class WeatherWidget extends Component {
  componentDidMount() {
    const { location, dispatch } = this.props
    dispatch(weatherFetch(location));
  }

  render() {
    const { isFetching, location } = this.props;
    const styles = require('./style.scss');
    let content = isFetching ?
      <i className="fa fa-spinner fa-spin"></i> :
      <div className={styles.widgetWeather}>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="widget-weather-forecast"><i className="wi wi-cloudy"></i></div>
                <div className="widget-weather-temp">
                  <span className={styles.widgetWeatherHigh}>63<i className="wi wi-degrees"></i></span>
                  {'/'}
                  <span className={styles.widgetWeatherLow}>52<i className="wi wi-degrees"></i></span>
                </div>
              </td>
              <td className={styles.widgetWeatherLocation}><i className="fa fa-building-o"></i></td>
            </tr>
            <tr>
              <td>61<i className="wi wi-degrees"></i></td>
              <td>54<i className="wi wi-humidity"></i></td>
            </tr>
          </tbody>
        </table>
      </div>;
    return (
      <td className="widget">
        <div className="widget-background">
          {content}
        </div>
      </td>
    )
  }
}

WeatherWidget.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
  // etd: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

WeatherWidget = connect((state, props) => state.weather[props.location])(WeatherWidget)

export default WeatherWidget

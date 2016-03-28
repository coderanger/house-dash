import React, { PropTypes } from 'react';
import BartWidget from '../bart_widget';
import MoonWidget from '../moon_widget';
import WeatherWidget from '../weather_widget';
import ClockWidget from '../clock_widget';
import CalendarWidget from '../calendar_widget';
import GifWidget from '../gif_widget';

const WidgetGrid = ({news}) => {
  const styles = require('./style.scss');
  return (
    <div className={styles.grid}>
      <table>
        <colgroup><col class="grid-col"></col><col class="grid-col"></col><col class="grid-col"></col><col class="grid-col"></col><col class="grid-col"></col><col class="grid-col"></col></colgroup>
        <tr class="grid-row">
          <BartWidget data={data.bart} />
          <MoonWidget data={data.moon} />
          <WeatherWidget data={data.city_weather} location="city" />
          <WeatherWidget data={data.home_weather} location="home" />
          <ClockWidget data={data.clock} />
        </tr>
        <tr class="grid-row">
        </tr>
        <tr class="grid-row">
          <CalendarWidget data={data.calendar} />
          <GifWdiget data={data.gif} />
        </tr>
        <tr class="grid-row">
        </tr>
      </table>
    </div>
  )
}

WidgetGrid.propTypes = {
  data: PropTypes.object.isRequired,
}

export default WidgetGrid

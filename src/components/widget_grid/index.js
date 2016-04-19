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
        <colgroup><col className={styles.gridCol}></col><col className={styles.gridCol}></col><col className={styles.gridCol}></col><col className={styles.gridCol}></col><col className={styles.gridCol}></col><col className={styles.gridCol}></col></colgroup>
        <tbody>
          <tr className={styles.gridRow}>
            <BartWidget/>
            <MoonWidget/>
            <WeatherWidget location="sf" />
            <WeatherWidget location="home" />
            <ClockWidget/>
          </tr>
          <tr className={styles.gridRow}>
          </tr>
          <tr className={styles.gridRow}>
            <CalendarWidget/>
            <GifWidget/>
          </tr>
          <tr className={styles.gridRow}>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default WidgetGrid

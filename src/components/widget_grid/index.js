import React, { PropTypes } from 'react';
import BartWidget from '../widgets/bart';
import MoonWidget from '../widgets/moon';
import WeatherWidget from '../widgets/weather';
import ClockWidget from '../widgets/clock';
// import CalendarWidget from '../calendar_widget';
import GifWidget from '../widgets/gif';
import DummyWidget from '../widgets/dummy';

const WidgetGrid = ({news}) => {
  const styles = require('./style.scss');
  return (
    <div className={styles.grid}>
      <div className={styles.gridRow}>
        <BartWidget rows="2" cols="2"/>
        <MoonWidget/>
        <WeatherWidget location="sf"/>
        <WeatherWidget location="home"/>
        <ClockWidget/>
      </div>
      <div className={styles.gridRow}>
        <DummyWidget rows="2" cols="2"/>
        <GifWidget rows="2" cols="2"/>
      </div>
    </div>
  )
}

export default WidgetGrid

import React, { PropTypes } from 'react';
// import BartWidget from '../bart_widget';
// import MoonWidget from '../moon_widget';
import WeatherWidget from '../widgets/weather';
// import ClockWidget from '../clock_widget';
// import CalendarWidget from '../calendar_widget';
// import GifWidget from '../gif_widget';
import DummyWidget from '../widgets/dummy';

const WidgetGrid = ({news}) => {
  const styles = require('./style.scss');
  return (
    // <div className={styles.grid}>
    //   <table>
    //     <colgroup><col className={styles.gridCol}></col><col className={styles.gridCol}></col><col className={styles.gridCol}></col><col className={styles.gridCol}></col><col className={styles.gridCol}></col><col className={styles.gridCol}></col></colgroup>
    //     <tbody>
    //       <tr className={styles.gridRow}>
    //         <BartWidget/>
    //         <MoonWidget/>
    //         <WeatherWidget location="sf" />
    //         <WeatherWidget location="home" />
    //         <ClockWidget/>
    //       </tr>
    //       <tr className={styles.gridRow}>
    //       </tr>
    //       <tr className={styles.gridRow}>
    //         <CalendarWidget/>
    //         <GifWidget/>
    //       </tr>
    //       <tr className={styles.gridRow}>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
    <div className={styles.grid}>
      <div className={styles.gridRow}>
        <DummyWidget rows="2" cols="2" isFetching={true}/>
        <DummyWidget rows="1" cols="1" isFetching={true}/>
        <WeatherWidget location="sf" rows="1" cols="1"/>
        <WeatherWidget location="home" rows="1" cols="1"/>
        <DummyWidget rows="1" cols="1"/>
      </div>
      <div className={styles.gridRow}>
        <DummyWidget rows="2" cols="2"/>
        <DummyWidget rows="2" cols="2"/>
      </div>
    </div>
  )
}

export default WidgetGrid

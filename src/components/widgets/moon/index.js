import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SunCalc from 'suncalc';

import BaseWidget from '../base';

const MOON_ICONS = [
  'wi-moon-alt-new',
  'wi-moon-alt-waxing-crescent-1',
  'wi-moon-alt-waxing-crescent-2',
  'wi-moon-alt-waxing-crescent-3',
  'wi-moon-alt-waxing-crescent-4',
  'wi-moon-alt-waxing-crescent-5',
  'wi-moon-alt-waxing-crescent-6',
  'wi-moon-alt-first-quarter',
  'wi-moon-alt-waxing-gibbous-1',
  'wi-moon-alt-waxing-gibbous-2',
  'wi-moon-alt-waxing-gibbous-3',
  'wi-moon-alt-waxing-gibbous-4',
  'wi-moon-alt-waxing-gibbous-5',
  'wi-moon-alt-waxing-gibbous-6',
  'wi-moon-alt-full',
  'wi-moon-alt-waning-gibbous-1',
  'wi-moon-alt-waning-gibbous-2',
  'wi-moon-alt-waning-gibbous-3',
  'wi-moon-alt-waning-gibbous-4',
  'wi-moon-alt-waning-gibbous-5',
  'wi-moon-alt-waning-gibbous-6',
  'wi-moon-alt-third-quarter',
  'wi-moon-alt-waning-crescent-1',
  'wi-moon-alt-waning-crescent-2',
  'wi-moon-alt-waning-crescent-3',
  'wi-moon-alt-waning-crescent-4',
  'wi-moon-alt-waning-crescent-5',
  'wi-moon-alt-waning-crescent-6',
];

class MoonWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateMoonPhase = this.updateMoonPhase.bind(this);
  }

  updateMoonPhase() {
    let moon = SunCalc.getMoonIllumination(new Date());
    this.setState({phase: moon.phase});
  }

  componentDidMount() {
    this.updateMoonPhaseInterval = setInterval(this.updateMoonPhase, 1000*60*60*24);
    this.updateMoonPhase();
  }

  componentWillUnmount() {
    if(this.updateMoonPhaseInterval) clearInterval(this.updateMoonPhaseInterval);
  }

  widgetContent() {
    const { phase } = this.state;
    const styles = require('./style.scss');
    let icon = MOON_ICONS[Math.floor(phase * 29)];
    return (
      <i className={'wi ' + icon + ' ' + styles.moonIcon}></i>
    )
  }
}

export default MoonWidget

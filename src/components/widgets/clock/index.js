import React from 'react';
import moment from 'moment';

import BaseWidget from '../base';

class ClockWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateClock = this.updateClock.bind(this);
  }

  updateClock() {
    this.setState({time: moment()});
  }

  componentDidMount() {
    this.updateClockInterval = setInterval(this.updateClock, 1000);
    this.updateClock();
  }

  componentWillUnmount() {
    if(this.updateClockInterval) clearInterval(this.updateClockInterval);
  }

  widgetContent() {
    const { time } = this.state;
    const styles = require('./style.scss');
    return (
      <div className={styles.clock}>
        <div>{time ? time.format('MMM D') : ''}</div>
        <div>{time ? time.format('hh:mm') : ''}</div>
      </div>
    )
  }
}

export default ClockWidget

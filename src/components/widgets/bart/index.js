import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import BaseWidget from '../base';
import { bartFetch } from '../../../actions';

class BartWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.updateBart = this.updateBart.bind(this);
    this.updateBartDisplay = this.updateBartDisplay.bind(this);
  }

  updateBart() {
    const { dispatch } = this.props
    dispatch(bartFetch());
  }

  updateBartDisplay() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.updateBartInterval = setInterval(this.updateBart, 1000*60*10);
    this.updateBartDisplayInterval = setInterval(this.updateBartDisplay, 1000);
    this.updateBart();
  }

  componentWillUnmount() {
    if(this.updateBartInterval) clearInterval(this.updateBartInterval);
    if(this.updateBartDisplayInterval) clearInterval(this.updateBartDisplayInterval);
  }

  widgetContent() {
    const { etd, advisory, escalators } = this.props;
    const styles = require('./style.scss');
    const now = moment();
    const walkingMinutes = 8;
    let etdMinutes = etd.map(e => moment(e).diff(now, 'minutes') - walkingMinutes).filter(e => e >= 0);
    let etdNext = etdMinutes.shift();
    return (
      <div className={styles.widget}>
        <i className={'fa fa-train '+styles.icon}></i>
        <div className={styles.next + ' ' + (etdNext !== undefined && etdNext < 5 ? styles.nextSoon : '')}>{etdNext !== undefined ? (etdNext + 'm') : 'N/A'}</div>
        <div className={styles.upcoming}>
          {etdMinutes.slice(0, 3).map(e => <div>{e}m</div>)}
        </div>
      </div>
    )
  }
}

BartWidget.propTypes = Object.assign({
  etd: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  advisory: PropTypes.string,
  escalators: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}, BaseWidget.propTypes)

BartWidget = connect(state => state.bart)(BartWidget)

export default BartWidget

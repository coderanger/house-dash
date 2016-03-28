import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { newsFetch } from '../../actions';

class Ticker extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(newsFetch());
  }

  render() {
    const { isFetching, items } = this.props;
    const styles = require('./style.scss');
    let content = isFetching ?
      <i className="fa fa-spinner fa-spin"></i> :
      <marquee scrolldelay="60" scrollamount="5">{items.map(it => it + ' | ')}</marquee>;
    return (
      <div className={styles.ticker}>
        {content}
      </div>
    )
  }
}

Ticker.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

Ticker = connect(state => state.news)(Ticker)

export default Ticker

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { newsFetch } from '../../actions';

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.updateNews = this.updateNews.bind(this);
  }

  updateNews() {
    const { dispatch } = this.props
    dispatch(newsFetch());
  }

  componentDidMount() {
    this.updateNewsInterval = setInterval(this.updateNews, 1000*60*60);
    this.updateNews();
  }

  componentWillUnmount() {
    if(this.updateNewsInterval) clearInterval(this.updateNewsInterval);
  }

  render() {
    const { isFetching, items } = this.props;
    const styles = require('./style.scss');
    let content = isFetching ?
      <div className={styles.loading}><i className="fa fa-spinner fa-spin"></i></div> :
      <div className={styles.wrap}><div className={styles.inner}>{items.map(it => it + ' | ')}{items.map(it => it + ' | ')}</div></div>;
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

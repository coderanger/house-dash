import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class BaseWidget extends Component {
  getDefaultProps() {
    return {rows: 1, cols: 1};
  }

  render() {
    const { rows, cols, isFetching } = this.props;
    const styles = require('./style.scss');
    let content = isFetching ?
      <i className={'fa fa-spinner fa-spin ' + styles.widgetSpinner}></i> :
      this.widgetContent();
    return (
      <div className={[styles.widget, styles['widgetRows' + rows], styles['widgetCols' + cols]].join(' ')}>
        <div className={styles.widgetBackground}>
          {content}
        </div>
      </div>
    )
  }

  widgetContent() {
    return (<div></div>);
  }
}

BaseWidget.propTypes = {
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cols: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default BaseWidget

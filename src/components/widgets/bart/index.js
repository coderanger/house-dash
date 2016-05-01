import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import BaseWidget from '../base';
import { bartFetch } from '../../../actions';

class BartWidget extends BaseWidget {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(bartFetch());
  }

  widgetContent() {
    const { etd, advisory, escalators } = this.props;
    return (
      <div></div>
    )
  }
}

BartWidget.propTypes = Object.assign({
  etd: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  advisory: PropTypes.string,
  escalators: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}, BaseWidget.propTypes)

BartWidget = connect(state => state.bart)(BartWidget)

export default BartWidget

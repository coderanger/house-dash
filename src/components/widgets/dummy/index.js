import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BaseWidget from '../base';

class DummyWidget extends BaseWidget {
}

DummyWidget = connect(state => ({}))(DummyWidget)

export default DummyWidget

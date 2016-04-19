import React, { PropTypes } from 'react';
import Ticker from '../ticker';
import WidgetGrid from '../widget_grid';

const App = () => {
  const styles = require('./style.scss');
  return (
    <div>
      <WidgetGrid/>
      <Ticker/>
    </div>
  )
}

export default App

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import BaseWidget from '../base';
import { gifFetch } from '../../../actions';

class GifWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.updateGif = this.updateGif.bind(this);
    this.updateGifDisplay = this.updateGifDisplay.bind(this);
  }

  updateGif() {
    const { dispatch } = this.props
    dispatch(gifFetch());
  }

  updateGifDisplay() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.updateGifInterval = setInterval(this.updateGif, 1000*60*60*24);
    this.updateGifDisplayInterval = setInterval(this.updateGifDisplay, 1000*60);
    this.updateGif();
  }

  componentWillUnmount() {
    if(this.updateGifInterval) clearInterval(this.updateGifInterval);
    if(this.updateGifDisplayInterval) clearInterval(this.updateGifDisplayInterval);
  }

  widgetContent() {
    const { images } = this.props;
    const styles = require('./style.scss');
    const image = images[Math.floor(Math.random() * images.length)];
    return (
      <div className={styles.gif}>
        <img src={image.link}></img>
      </div>
    )
  }
}

GifWidget.propTypes = Object.assign({
  gifs: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}, BaseWidget.propTypes)

GifWidget = connect(state => state.gif)(GifWidget)

export default GifWidget

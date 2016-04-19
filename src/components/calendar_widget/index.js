import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bartFetch } from '../../actions';

class CalendarWidget extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    // dispatch(bartFetch());
  }

  render() {
    const { isFetching, etd } = this.props;
    let content = true ?
      <i className="fa fa-spinner fa-spin"></i> :
      <p></p>;
    return (
      <td className="widget" rowSpan="2" colSpan="2">
        <div className="widget-background">
          {content}
        </div>
      </td>
    )
  }
}

CalendarWidget.propTypes = {
  // isFetching: PropTypes.bool.isRequired,
  // etd: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

CalendarWidget = connect(state => ({}))(CalendarWidget)

export default CalendarWidget

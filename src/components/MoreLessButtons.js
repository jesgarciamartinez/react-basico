import React from 'react';
import PropTypes from 'prop-types';

class MoreLessButtons extends React.Component {
  static propTypes = {
    upFunction: PropTypes.func,
    downFunction: PropTypes.func,
  };

  callUpFunction = () => {
    const {upFunction} = this.props;

    upFunction();
  };

  callDownFunction = () => {
    const {downFunction} = this.props;

    downFunction();
  };

  render() {
    const moreLessButtonsStyle = {
      display: 'grid',
      width: '20px',
      height: '40px',
    };

    return (
      <div style={moreLessButtonsStyle}>
        <input type="button" value="+" onClick={this.callUpFunction} />
        <input type="button" value="-" onClick={this.callDownFunction} />
      </div>
    );
  }
}

export default MoreLessButtons;

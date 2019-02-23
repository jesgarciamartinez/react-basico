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
    return (
      <div>
        <input type="button" value="+" onChange={this.callUpFunction} />
        <input type="button" value="-" onChange={this.callDownFunction} />
      </div>
    );
  }
}

export default MoreLessButtons;

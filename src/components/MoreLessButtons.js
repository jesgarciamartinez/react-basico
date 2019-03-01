import React from 'react';
import PropTypes from 'prop-types';

class MoreLessButtonsCore extends React.Component {
  static propTypes = {
    upFunction: PropTypes.func,
    downFunction: PropTypes.func,
    vertical: PropTypes.bool,
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
    const {vertical} = this.props;

    const moreLessButtonsStyle = {
      borderStyle: 'solid',
      borderWidth: '1px',
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: vertical ? 'column' : 'row',
      width: vertical ? '20px' : '40px',
      height: vertical ? '40px' : '20px',
    };

    return (
      <div style={moreLessButtonsStyle}>
        <input type="button" value="+" onClick={this.callUpFunction} />
        <input type="button" value="-" onClick={this.callDownFunction} />
      </div>
    );
  }
}

const MoreLessButtons = {
  vertical: props => {
    return <MoreLessButtonsCore {...props} vertical={true} />;
  },

  horizontal: props => {
    return <MoreLessButtonsCore {...props} vertical={false} />;
  },
};

export default MoreLessButtons;

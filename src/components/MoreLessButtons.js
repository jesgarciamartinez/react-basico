import React from 'react'
import PropTypes from 'prop-types'

const moreLessButtonsStyle = {
  display: 'inline-flex',
  flexdirection: 'row',
  border: '2px solid black',
}
class MoreLessButtons extends React.Component {
  static propTypes = {
    upFunction: PropTypes.func,
    downFunction: PropTypes.func,
  }
  render() {
    return (
      <div style={moreLessButtonsStyle}>
        <input type="button" value="+" onClick={this.props.upFunction} />
        <input type="button" value="-" onClick={this.props.downFunction} />
      </div>
    )
  }
}

export default MoreLessButtons

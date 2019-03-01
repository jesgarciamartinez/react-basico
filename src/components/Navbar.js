import React from 'react'
import PropTypes from 'prop-types'
import App from '../App'

// mergeStyles :: [Object| Array | false]
// const mergeStyles = (...styles) => {
//   return styles.reduce((acc, style) => {
//     if (Array.isArray(style)){

//     }
//     return {acc}
//   }, {})
// }

const Navbar = ({children, vertical, style}) => {
  let navbarStyles = {
    borderStyle: 'solid',
    borderWidth: '0px 1px 1px 0px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...(vertical
      ? {flexDirection: 'column', width: '200px', height: '100vh'}
      : {}),
  }

  let liStyle = {
    padding: '2px',
  }

  if (vertical) {
    navbarStyles = {
      ...navbarStyles,
      flexDirection: 'column',
      width: '200px',
      height: '100vh',
    }
    liStyle = {
      ...liStyle,
      display: 'block',
    }
  } else {
    navbarStyles = {
      ...navbarStyles,
      flexDirection: 'row',
    }
    liStyle = {
      ...liStyle,
      display: 'inline',
    }
  }

  return (
    <div style={{...navbarStyles, ...style}}>
      <h1>{children}</h1>
      <ul style={{listStyleType: 'none'}}>
        <li style={liStyle}>Section One</li>
        <li style={liStyle}>Section Two</li>
      </ul>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string,
  vertical: PropTypes.bool,
}

export default Navbar

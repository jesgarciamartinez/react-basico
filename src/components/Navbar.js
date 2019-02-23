import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({children, vertical}) => {
  let navbarStyles = {
    borderStyle: 'solid',
    borderWidth: '0px 1px 1px 0px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  };

  let liStyle = {
    padding: '2px',
  };
  if (vertical) {
    navbarStyles = {
      ...navbarStyles,
      flexDirection: 'column',
      width: '200px',
      height: '100vh',
    };
    liStyle = {
      ...liStyle,
      display: 'block',
    };
  } else {
    navbarStyles = {
      ...navbarStyles,
      flexDirection: 'row',
    };
    liStyle = {
      ...liStyle,
      display: 'inline',
    };
  }

  return (
    <div style={navbarStyles}>
      <h1>{children}</h1>
      <ul style={{listStyleType: 'none'}}>
        <li style={liStyle}>Section One</li>
        <li style={liStyle}>Section Two</li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;

import React from 'react';
import PropTypes from 'prop-types';

const BackgroundImage = ({children, url}) => (
  <div style={{backgroundImage: `url(${url})`}}>{children}</div>
);

BackgroundImage.propTypes = {
  url: PropTypes.string,
};

export default BackgroundImage;

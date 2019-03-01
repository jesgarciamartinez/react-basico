import React from 'react';
import './MediaObject.css';
import Text from '../Text';
import propTypes from 'prop-types';

const MediaObject = ({imgSrc, text, vertical = false, ...props}) => (
  <div className={`mediaObject${vertical ? ' vertical' : ''}`} {...props}>
    <img src={imgSrc} />
    <Text.Regular className="text" children={text} />
  </div>
);

MediaObject.propTypes = {
  imgSrc: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  vertical: propTypes.bool,
};
export default MediaObject;

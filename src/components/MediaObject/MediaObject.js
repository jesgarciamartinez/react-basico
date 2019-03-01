import React from 'react';
import './MediaObject.css';
import Text from '../Text';

const MediaObject = ({imgSrc, text, vertical = false}) => (
  <div className={`mediaObject${vertical ? ' vertical' : ''}`}>
    <img src={imgSrc} />
    <Text.Regular className="text" children={text} />
  </div>
);

export default MediaObject;

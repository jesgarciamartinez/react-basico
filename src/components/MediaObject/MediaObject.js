import React from 'react';
import './MediaObject.css';

const MediaObject = ({imgSrc, text, vertical = false}) => (
  <div className={`mediaObject${vertical ? ' vertical' : ''}`}>
    <img src={imgSrc} />
    <span className="text">{text}</span>
  </div>
);

export default MediaObject;

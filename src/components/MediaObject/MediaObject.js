import React from 'react';
import './MediaObject.css';

const MediaObject = ({imgSrc, text, vertical = false}) => (
  <div className={vertical && 'vertical'}>
    <img src={imgSrc} />
    <span>{text}</span>
  </div>
);

export default MediaObject;

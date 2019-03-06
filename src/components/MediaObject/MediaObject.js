import React from 'react'
import styles from './MediaObject.module.css'
import Text from '../Text'
import propTypes from 'prop-types'

const MediaObject = ({
  imgSrc,
  width,
  text,
  vertical = false,
  className,
  ...props
}) => (
  <div
    // className={`${styles.mediaObject}${
    //   vertical ? ' mg5 pd4 vertical' : ''
    // } ${className}`}
    className={[styles.mediaObject, vertical && ' mg5 pd4 vertical', className]
      .filter(Boolean)
      .join('')}
    {...props}
  >
    <img width={width} src={imgSrc} alt={text} />
    <Text.Regular bold className="text" children={text} />
  </div>
)

MediaObject.propTypes = {
  imgSrc: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  vertical: propTypes.bool,
}
MediaObject.defaultProps = {
  className: '',
}
export default MediaObject

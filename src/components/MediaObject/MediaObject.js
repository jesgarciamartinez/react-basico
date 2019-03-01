import React from 'react'
import './MediaObject.css'
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
    className={`mediaObject${vertical ? ' vertical' : ''} ${className}`}
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

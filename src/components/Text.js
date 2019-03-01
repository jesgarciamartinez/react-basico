import React from 'react';
import PropTypes from 'prop-types';

const commonsStyle = {
  fontFamily: 'Montserrat',
};

const titleStyle = {
  color: '#000',
  fontSize: '2em',
};

const subtitleStyle = {
  color: '#ff7900',
  fontSize: '1.5em',
};

const regularStyle = {
  color: '#999999',
  fontSize: '1em',
};

const textFactory = type => ({bold, italic, style, children, className}) => {
  const Tag = {
    title: 'h1',
    subTitle: 'h3',
    regular: 'p',
    span: 'span',
  }[type];

  const customStyle =
    {
      title: titleStyle,
      subTitle: subtitleStyle,
    }[type] || regularStyle;

  customStyle.fontWeight = bold ? '800' : '400';
  customStyle.fontStyle = italic ? 'italic' : 'normal';

  const props = {
    className,
    style: {
      ...commonsStyle,
      ...customStyle,
      ...style,
    },
  };
  return <Tag {...props}>{children}</Tag>;
};

const Text = {
  Title: textFactory('title'),
  SubTitle: textFactory('subTitle'),
  Regular: textFactory('regular'),
  Span: textFactory('span'),
};

Text.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.instanceOf(React.className),
  style: PropTypes.instanceOf(React.style),
  bold: PropTypes.bool,
  italic: PropTypes.bool,
};

export default Text;

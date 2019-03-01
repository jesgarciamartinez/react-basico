import React from 'react';

// Fuentes de la web de Kairos, extraídas con SnappySnippet
// font: normal normal 400 normal 40px / 56px Oswald, sans-serif;
// font: normal normal 400 normal 24px / 26.4px Roboto, sans-serif;
// font: normal normal 400 normal 16px / 22.4px Oswald, sans-serif;
// font: normal normal 400 normal 13px / 18.2px Roboto, sans-serif;

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

const textFactory = type => ({style, children}) => {
  const Tag = {
    title: 'h1',
    subTitle: 'h3',
    regular: 'p',
  }[type];

  const customStyle = {
    title: titleStyle,
    subTitle: subtitleStyle,
    regular: regularStyle,
  }[type];

  return (
    <Tag
      style={{
        ...commonsStyle,
        ...customStyle,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
};

const Text = {
  Title: textFactory('title'),
  SubTitle: textFactory('subTitle'),
  Regular: textFactory('regular'),
};

export default Text;

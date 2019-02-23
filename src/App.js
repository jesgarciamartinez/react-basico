import React from 'react';
import './App.css';
import {BackgroundImage, Section, Text, MediaObject} from './components';

function App() {
  return (
    <MediaObject
      imgSrc="http://via.placeholder.com/300"
      text="hello"
      vertical
    />
    // <Section>
    //   <BackgroundImage>
    //     <Text>
    //       Transformamos organizaciones apoyadas en principios Agile, basándonos
    //       en disciplinas digitales. (Diseño UX, DevOps arquitectura y Desarrollo
    //       de Software)
    //     </Text>
    //   </BackgroundImage>
    // </Section>
  );
}

export default App;

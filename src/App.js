import React from 'react';
import './App.css';
import {Navbar, MediaObject} from './components';

function App() {
  return (
    <Navbar
      children={
        <MediaObject imgSrc="http://via.placeholder.com/300" text="hello" />
      }
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

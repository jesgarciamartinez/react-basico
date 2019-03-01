import React from 'react';
import './App.css';
import {Navbar, MediaObject, BackgroundImage} from './components';

function App() {
  return (
    <>
      <Navbar
        children={
          <MediaObject
            width="40px"
            imgSrc="https://kds-k2-createtesthelper.firebaseapp.com/images/logo.svg"
            text="K2 | Generador de test"
          />
        }
      />
      <BackgroundImage url="https://kds-k2-createtesthelper.firebaseapp.com/images/gplaypattern.png" />
    </>
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

import React from 'react'
import './App.css'
import {Navbar, MediaObject, BackgroundImage, Text} from './components'

const Section = props => <div style={{border: '2px solid orange'}} {...props} />

class Input extends React.Component {
  state = {
    focused: false,
  }
  onFocus = () => {
    this.props.onFocus()
    this.setState({focused: true})
  }
  onBlur = () => {
    this.setState({focused: false}, this.props.onBlur)
  }
  render() {
    const {label, placeholder, style, ...rest} = this.props
    const ownStyle = this.state.focused ? {borderBottom: '2px solid blue'} : {}
    return (
      <label style={{...ownStyle, ...style}}>
        {label || placeholder}
        <input
          placeholder={placeholder}
          {...rest}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </label>
    )
  }
}

function App() {
  return (
    <>
      <BackgroundImage url="https://kds-k2-createtesthelper.firebaseapp.com/images/gplaypattern.png">
        <Navbar
          style={{backgroundColor: 'white'}}
          children={
            <MediaObject
              width="40px"
              imgSrc="https://kds-k2-createtesthelper.firebaseapp.com/images/logo.svg"
              text="K2 | Generador de test"
            />
          }
        />
        <Text.SubTitle bold>Información</Text.SubTitle>
        <Section>
          <Input
            type="text"
            label={'Nombre del test'}
            style={{marginLeft: 50}}
            onFocus={() => {
              console.log('hola')
            }}
          />
        </Section>
      </BackgroundImage>
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
  )
}

export default App

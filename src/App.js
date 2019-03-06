import React from 'react'
import './App.css'
import {
  Navbar,
  MediaObject,
  BackgroundImage,
  Text,
  MoreLessButtons,
} from './components'
import styled from 'styled-components'

/* Este componente escrito con styled-components se comporta igual que si escribiéramos 

   const Section = props => <div style={{border: '2px solid orange'}} {...props} />

   No es exactamente lo mismo porque styled-components no usa inline styles, sino que
   inserta un stylesheet con las reglas que le pasemos en el documento, y además está
   preparado para recibier un tema por contexto.
*/
const Section = styled.div({border: '2px solid orange'})

class Input extends React.Component {
  state = {
    focused: false,
  }
  onFocus = () => {
    this.setState({focused: true}, () => {
      /* Llamamos a onFocus sólo si el usuario nos la proporciona */
      this.props.onFocus && this.props.onFocus()
    })
  }
  onBlur = () => {
    this.setState({focused: false}, () => {
      this.props.onBlur && this.props.onBlur()
    })
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
          /* Importa el orden: queremos que this.onFocus y this.onBlur sobreescriban posibles
             onFocus y onBlur que vengan de fuera - de esta forma seteamos el estado local y
             luego invocamos los handlers externos
          */
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </label>
    )
  }
}

const AnswerComponent = ({
  text,
  score,
  onChangeText,
  onChangeScore,
  upFunction,
  downFunction,
  style,
}) => {
  return (
    <div style={style}>
      <Input value={text} onChange={onChangeText} />
      <Input value={score} onChange={onChangeScore} type={'number'} />
      <MoreLessButtons
        /* Este truco que sugirió Rodrigo es lo mismo que escribir upFunction={upFunction} downFunction={downFunction}*/
        {...{upFunction, downFunction}}
      />
    </div>
  )
}

/* Tenemos que tratar el estado de los componentes de React como inmutable: 
   con helpers como estos podemos operar sobre arrays creando nuevos arrays cada vez.
*/

const updateAtIndex = (array, index, element) => {
  const previousElements = array.slice(0, index)
  const laterElements = array.slice(index + 1)

  return [...previousElements, element, ...laterElements]
}

const removeAtIndex = (array, index) => {
  const previousElements = array.slice(0, index)
  const laterElements = array.slice(index + 1)

  return [...previousElements, ...laterElements]
}

const insertAtIndex = (array, index, element) => {
  const previousElements = array.slice(0, index)
  const laterElements = array.slice(index)

  return [...previousElements, element, ...laterElements]
}

class Question extends React.Component {
  state = {
    questionText: '',
    /* Tenemos una sola respuesta al principio */
    answers: [
      {
        text: '',
        score: 0,
      },
    ],
  }
  onChangeQuestionText = ({target: {value: questionText}}) => {
    this.setState({questionText})
  }
  onChangeText = (e, i) => {
    /* Accedemos al valor que queremos extraer del evento de forma síncrona, no en el
      handler de setState, que es asíncrono y nos puede dar problemas porque React reusa
      o setea a null los eventos de su sistema de eventos sintéticos
    */
    const {value: text} = e.target
    this.setState(prevState => {
      /* 1era forma de mantener la inmutabilidad:
         haciendo copias 'profundas' - a todos los niveles que necesitemos -
         y mutando éstas.
         En este caso queremos cambiar el texto de una respuesta, por lo que
         copiamos todo el array de preguntas y el objeto answer que queremos modificar.
      */
      const newAnswers = [...prevState.answers]
      const newSelectedAnswer = {...prevState.answers[i]}

      /* Mutamos las copias */
      newSelectedAnswer.text = text
      newAnswers[i] = newSelectedAnswer

      return {
        answers: newAnswers,
      }
    })
  }
  onChangeScore = (e, i) => {
    const {value: score} = e.target
    /* 2a forma de mantener la inmutabilidad:
       con el método updateAtIndex para crear un nuevo array,
       y creando que copie todos los campos del objeto answer
       que queremos modificar, y sobreescriba score.
    */
    this.setState(prevState => {
      return {
        answers: updateAtIndex(prevState.answers, i, {
          ...prevState.answers[i],
          score,
        }),
      }
    })
  }
  addAnswer = i => {
    this.setState(prevState => {
      return {
        answers: insertAtIndex(prevState.answers, i, {text: '', score: 0}),
      }
    })
  }
  removeAnswer = i => {
    this.setState(prevState => {
      return {
        answers: removeAtIndex(prevState.answers, i),
      }
    })
  }

  render() {
    return (
      <Section>
        <Input
          label={'Enter your question'}
          value={this.state.questionText}
          onChange={this.onChangeQuestionText}
        />
        {this.state.answers.map(({text, score}, i) => {
          return (
            <AnswerComponent
              text={text}
              score={score}
              key={i}
              /* Usamos handlers inline para llamar a nuestros métodos 
                pasando 'i' - para modificar la respuesta en ese index.
              */
              onChangeText={e => this.onChangeText(e, i)}
              onChangeScore={e => this.onChangeScore(e, i)}
              upFunction={e => this.addAnswer(i)}
              downFunction={e => this.removeAnswer(i)}
            />
          )
        })}
      </Section>
    )
  }
}

class App extends React.Component {
  state = {}
  render() {
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
          <Question />
        </BackgroundImage>
      </>
    )
  }
}

export default App

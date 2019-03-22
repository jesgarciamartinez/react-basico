import React from 'react'

class Counter extends React.Component {
  state = {count: 0}
  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }
  decrement = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
  }
  render() {
    /* Esperamos que children sea una función; la llamamos
       con el estado y los handlers. 
       El JSX que devuelva la función será lo que se pinte.
    */
    return this.props.children({
      count: this.state.count,
      increment: this.increment,
      decrement: this.decrement,
    })
  }
}

export const Buttons = ({number, plus, minus}) => {
  return (
    <>
      <button onClick={plus}>+</button>
      <div>{number}</div>
      <button onClick={minus}>-</button>
    </>
  )
}

/* Es sencillo implementar HOCs a partir de Render Props */

/* Este HOC toma un componente y nos devuelve otro (anónimo) 
   que usa el Counter implementado con Render Props
*/
export const withCounter = WrappedComponent => props => (
  <Counter>
    {counterProps => <WrappedComponent {...counterProps} {...props} />}
  </Counter>
)

/* 
   MALA PRÁCTICA

   Este HOC toma un componente y nos devuelve otro 
   que usa el Counter implementado con Render Props y
   le pasa el componente directamente 

   - funcionará sólo si el WrappedComponent está implementado como una función

   const withCounter2 = WrappedComponent =>
    class WithCounter extends React.Component {
      render() {
        return <Counter>{WrappedComponent}</Counter>
      }
    }
*/

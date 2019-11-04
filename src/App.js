import React, {useState} from 'react'
import './App.css'
import OnlineToast from './online-toast/OnlineToast'

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
    /* Llamamos a children como una función.
       El JSX que devuelva será lo que se pinte.
    */
    return this.props.render({
      count: this.state.count,
      increment: this.increment,
      decrement: this.decrement,
    })
  }
}

const withCounter = WrappedComponent =>
  class WithCounter extends React.Component {
    render() {
      return (
        <Counter
          render={counterProps => (
            <WrappedComponent {...counterProps} {...this.props} />
          )}
        ></Counter>
      )
    }
  }

const useCounter = (initialState = 0) => {
  const [count, setCount] = useState(initialState)
  const increment = () => {
    setCount(count => count + 1)
  }
  const decrement = () => {
    setCount(count => count - 1)
  }
  return {
    count,
    increment,
    decrement,
  }
}

const Renderer = ({count, increment, decrement}) => {
  return (
    <div>
      {count}
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  )
}

const FullCounter = withCounter(Renderer)
const FullCounter2 = () => {
  const counterProps = useCounter(1000)
  return <Renderer {...counterProps} />
}

function App() {
  return (
    <React.Fragment>
      <Counter render={props => <Renderer {...props} />} />
      <FullCounter />
      <FullCounter2 />
      <OnlineToast />
    </React.Fragment>
  )
}

export default App

import React from 'react'

/*
    Compound Components puede implementarse accediendo
    y modificando los children o empleando la API de Context.
    
    Cuando no existía una API de Context tan sencilla como la actual,
    podía tener más sentido la implementación 'sucia pero fácil'
    de modificar los children, pese al problema de que sólo permite
    meter compound components como hijos directos del padre.

    Esta implementación sería así:

    function Increment({onClick}) {
      return <button {...{onClick}}>+</button>
    }
    function Decrement({onClick}) {
      return <button {...{onClick}}>-</button>
    }
    function View({count, render}) {
      return render(count)
    }
    
    class Counter extends React.Component {
      state = {
        count: 0,
      }
      static Increment = Increment
      static Decrement = Decrement
      static View = View
      increment = () => {
        this.setState(state => ({
          count: state.count + 1,
        }))
      }
      decrement = () => {
        this.setState(state => ({
          count: state.count - 1,
        }))
      }
    
      render() {
        return React.Children.map(this.props.children, child => {
          if (child.type.name === 'Increment') {
            return React.cloneElement(child, {
              onClick: this.increment,
            })
          } else if (child.type.name === 'Decrement') {
            return React.cloneElement(child, {
              onClick: this.decrement,
            })
          } else {
            // View
            return React.cloneElement(child, {
              count: this.state.count,
            })
          }
        })
      }
    }
    
    function App() {
      return (
        <Counter>
          <Counter.Increment />
          <Counter.View render={count => <div>{count}</div>} />
          <Counter.Decrement />
        </Counter>
      )
    }

    Es decir, hacemos un map sobre los children, y, sabiendo el tipo de cada uno,
    clonamos el elemento inyectándole las props necesarias.

    Hoy en día esta alternativa no parece tener ventajas respecto a usar Context - 
    realmente el patrón consiste en acotar el uso de un contexto
    a unos componentes determinados, sin exponer el contexto al usuario.
*/

const Context = React.createContext()

function Increment() {
  return (
    <Context.Consumer>
      {({increment}) => <button onClick={increment}>+</button>}
    </Context.Consumer>
  )
}
function Decrement() {
  return (
    <Context.Consumer>
      {({decrement}) => <button onClick={decrement}>-</button>}
    </Context.Consumer>
  )
}
function View({children}) {
  return <Context.Consumer>{({count}) => children(count)}</Context.Consumer>
}

export class Counter extends React.Component {
  static Increment = Increment
  static Decrement = Decrement
  static View = View

  increment = () => {
    this.setState(state => ({
      count: state.count + 1,
    }))
  }
  decrement = () => {
    this.setState(state => ({
      count: state.count - 1,
    }))
  }
  state = {
    count: 0,
    decrement: this.decrement,
    increment: this.increment,
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

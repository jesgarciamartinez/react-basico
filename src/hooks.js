import React, {useState, useReducer, useEffect, useContext} from 'react'

/* counter implementado con useState */

const useCounter = initialValue => {
  const [count, setCount] = useState(initialValue || 0)

  const increment = () => {
    setCount(count => count + 1)
  }
  const decrement = () => {
    setCount(count => count - 1)
  }

  return {count, increment, decrement}
}

const Button = ({primaryColor, backgroundColor, onClick}) => (
  <div style={{color: primaryColor, backgroundColor, padding: '20px'}}>
    <button onClick={onClick}>Hola</button>
  </div>
)

/* Theme implementado con context y hooks */
const Theme = React.createContext()
const ChangeTheme = React.createContext()
const defaultTheme = {backgroundColor: 'red'}

export const ThemeProvider = ({theme, children}) => {
  const [themeInState, setTheme] = useState(theme || defaultTheme)
  return (
    <Theme.Provider value={themeInState}>
      <ChangeTheme.Provider value={setTheme}>{children}</ChangeTheme.Provider>
    </Theme.Provider>
  )
}
export const useTheme = () => {
  return useContext(Theme)
}
export const useChangeTheme = () => {
  return useContext(ChangeTheme)
}

export const ChangeThemeButton = props => {
  const setTheme = useChangeTheme()
  const theme = useTheme()
  return (
    <Button
      {...theme}
      {...props}
      onClick={() => setTheme({backgroundColor: 'blue'})}
    >
      Change theme
    </Button>
  )
}

const ThemedButton = () => (
  <Theme.Consumer>{theme => <Button {...theme} />}</Theme.Consumer>
)

const withTheme = WrappedComponent => {
  const ThemedComponent = props => {
    const theme = useTheme()
    return <WrappedComponent {...theme} {...props} />
  }
  return ThemedComponent
}

export const ThemedButton2 = withTheme(Button)

export const ThemeDemostration = () => {
  return (
    <div style={{padding: 100}}>
      <ThemeProvider theme={{backgroundColor: 'red'}}>
        <div>
          <ThemedButton />
        </div>
      </ThemeProvider>
    </div>
  )
}

/* useEffect */

/* Mock de socket de mensajes */
let key = 1
const getRandomValueFromArray = arr =>
  arr[Math.floor(Math.random() * arr.length)]
const messages = [
  {text: 'React mola!'},
  {text: 'Angular sucks'},
  {text: 'Tengo hambre'},
]
const messagesSocket = {
  subscribe(userId, cb) {
    const id = setInterval(() => {
      cb({id: key++, text: userId + getRandomValueFromArray(messages).text})
    }, 1000)
    return function unsubscribe() {
      clearInterval(id)
    }
  },
}

export class MessagesSubscriber extends React.Component {
  state = {
    messages: [{id: 0, text: 'firstMessage'}],
  }
  componentDidMount() {
    this.unsubscribe = messagesSocket.subscribe(message => {
      this.setState(prev => ({
        messages: prev.messages.concat(message),
      }))
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <ul style={{padding: 100}}>
        {this.state.messages.map(message => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    )
  }
}

const useMessages = userId => {
  const [messages, setMessages] = useState([{id: 0, text: 'firstMessage'}])
  const concatMessage = message => {
    setMessages(prev => prev.concat(message))
  }

  useEffect(() => {
    return messagesSocket.subscribe(userId, concatMessage)
    /* incluimos userId en el array de dependencias: cuando cambie userId se limpiará la
        suscripción y volverá a suscribirse con el nuevo userId
     */
  }, [userId])

  return messages
}

function MessagesSubscriber2({userId}) {
  const messages = useMessages(userId)

  return (
    <ul style={{padding: 100}}>
      {messages.map(message => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  )
}

export function UseEffectDependenciesDemonstration() {
  const [userId, setUserId] = useState(1)

  return (
    <div style={{padding: 100}}>
      <button onClick={() => setUserId(2)}>Change to 2</button>
      <MessagesSubscriber2 userId={userId} />
    </div>
  )
}

/* 
    
   useReducer

   Un reducer es una función como la que le pasamos a Array.reduce:

    const sumReducer = (acc, v) => acc + v
    const sum = [1, 2, 3].reduce(sumReducer, 0)

   reducer :: (a, b) -> a

   En el caso de useReducer, el hook nos devuelve un array con
   el estado y la función dispatch (llamada así por convención).
   Dispatch toma una acción - un objeto de JS con la propiedad
   type (por convención) y otra información que queramos mandar -
   e invoca al reducer con el estado actual y la acción para obtener
   el nuevo estado.
 */

const initialState = {count: 0}

const countReducer = (state, action) => {
  if (action.type === 'increment') {
    return {
      count: state.count + action.payload,
    }
  }
  if (action.type === 'decrement') {
    return {
      count: state.count - action.payload,
    }
  }
}

export const useCounterWithReducer = () => {
  const [state, dispatch] = useReducer(countReducer, initialState)

  const increment = () => dispatch({type: 'increment', payload: 3})
  const decrement = () => dispatch({type: 'decrement', payload: 3})

  return {count: state.count, increment, decrement}
}

export function CounterExample() {
  const {count, increment, decrement} = useCounterWithReducer()

  return (
    <div>
      <button onClick={increment}>+</button>
      <div>{count}</div>
      <button onClick={decrement}>-</button>
    </div>
  )
}

import React from 'react'

const defaultTheme = {
  primaryColor: 'red',
  backgroundColor: 'blue',
}
const Theme = React.createContext({theme: defaultTheme, changeTheme() {}})

const Button = ({primaryColor, backgroundColor}) => (
  <div style={{color: primaryColor, backgroundColor}}>Hola</div>
)

export const ThemedButton = () => (
  <Theme.Consumer>{({theme}) => <Button {...theme} />}</Theme.Consumer>
)

export const ThemeChanger = () => (
  <Theme.Consumer>
    {({changeTheme}) => <button onClick={changeTheme}>Change theme</button>}
  </Theme.Consumer>
)

export class ContextExample extends React.Component {
  changeTheme = () => {
    this.setState({
      theme: {primaryColor: 'blue', backgroundColor: 'red'},
    })
  }
  state = {
    theme: defaultTheme,
    changeTheme: this.changeTheme,
  }
  render() {
    return (
      <div>
        <Theme.Provider value={this.state}>
          {this.props.children}
        </Theme.Provider>
      </div>
    )
  }
}

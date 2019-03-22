import React from 'react'

/* Mock de una API de comments */
const comments = [
  {id: '1', text: 'hola'},
  {id: '2', text: 'hola'},
  {id: '3', text: 'hola'},
]
const DataSource = {
  getComments() {
    return {
      then(cb) {
        cb(comments)
      },
    }
  },
}

/* HOC que toma un componente y lo 'conecta' a la API de comments:
   devuelve un nuevo componente que hace la llamada en componentDidMount,
   guarda los comments en su estado y los pasa por props al componente.

   TODO
   Nos aseguramos de ponerle el displayName que queremos, de pasarle
   al WrappedComponent todas las props y ....
*/
const withComments = WrappedComponent => {
  class WithComments extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        comments: [],
      }
    }

    componentDidMount() {
      DataSource.getComments().then(comments => {
        this.setState({comments})
      })
    }

    render() {
      return <WrappedComponent comments={this.state.comments} {...this.props} />
    }
  }
  return WithComments
}

const CommentsComponent = ({comments}) => {
  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>{comment.text}</li>
      ))}
    </ul>
  )
}

const __DEV__ = true

/* factoría de HOCs que toma en primer lugar una condición y devuelve un HOC
   que pintará el WrappedComponent si se cumple la condición.

   Es habitual esta forma de escribir factorías de HOCS con currying 
   para poder componer con facilidad varios HOCs
*/
const withCondition = condition => WrappedComponent =>
  class extends React.Component {
    render() {
      return condition ? <WrappedComponent /> : null
    }
  }

const compose = (f, g) => x => f(g(x))

/* Componemos varios HOCs - tendremos un árbol de componentes con varios
   wrappers.
*/
const enhance = compose(
  withComments,
  withCondition(__DEV__),
)

const EnhancedComments = enhance(CommentsComponent)

export default EnhancedComments

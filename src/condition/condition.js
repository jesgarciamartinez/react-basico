/* A HOC, RenderProps component and hook to render a component only if a condition is met */

const withCondition = condition => WrappedComponent => {
  function WithCondition(props) {
    return condition ? <WrappedComponent {...props} /> : null
  }
  return WithCondition
}

export {withCondition}

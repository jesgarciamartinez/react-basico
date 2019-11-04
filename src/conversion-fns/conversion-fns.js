import React from 'react'
/**
 * A function to create a HOC from any render prop component
 * Example:
 * const withCounter = renderPropToHOC(CounterRenderPropsComponent)
 */
function renderPropToHOC(RenderPropsComponent, renderPropName = 'render') {
  return WrappedComponent => {
    function HOC(HOCProps) {
      return (
        <RenderPropsComponent
          {...{
            [renderPropName]: renderProps => (
              <WrappedComponent {...renderProps} {...HOCProps} />
            ),
          }}
        />
      )
    }
    HOC.displayName = `With${WrappedComponent.name ||
      WrappedComponent.displayName ||
      ''}`
    return HOC
  }
}

const hookToRenderProps = (hook, ...hookArgs) => ({render}) => {
  const hookProps = hook(...hookArgs)
  return render(hookProps)
}

const hookToHOC = (hook, ...hookArgs) => WrappedComponent => {
  function HOC(HOCProps) {
    const hookProps = hook(...hookArgs)
    return <WrappedComponent {...hookProps} {...HOCProps} />
  }
  HOC.displayName = `With${WrappedComponent.name ||
    WrappedComponent.displayName ||
    ''}`
  return HOC
}

export {renderPropToHOC, hookToRenderProps, hookToHOC}

/* A HOC, RenderProps component and hook to make a request and manage its state - loading, data, error */
import {useState, useEffect} from 'react'
import {hookToRenderProps, hookToHOC} from '../conversion-fns/conversion-fns'

const requestStates = {
  loading: 'loading',
  error: 'error',
  success: 'success',
}

const useRequest = ({url, ...props}) => {
  const [requestState, setRequestState] = useState()
  const [data, setData] = useState()
  const [error, setError] = useState()
  useEffect(() => {
    const doRequest = async () => {
      setRequestState(requestStates.loading)
      let response
      try {
        response = await fetch(url, props)
      } catch (error) {
        setRequestState(requestStates.error)
        setError(error)
      }
      setRequestState(requestStates.success)
      setData(response)
    }
    doRequest()
  }, [url, props])

  return {
    requestState,
    error,
    data,
  }
}

const Request = hookToRenderProps(useRequest)
const withRequest = hookToHOC(useRequest)

export {Request, withRequest, useRequest, requestStates}

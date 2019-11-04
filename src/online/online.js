/* A HOC, RenderProps component and hook to track online status - use this API: 
    https://developer.mozilla.org/es/docs/Web/API/NavigatorOnLine/onLine
*/

import {useState, useEffect} from 'react'
import {hookToRenderProps, hookToHOC} from '../conversion-fns/conversion-fns'

const useConnection = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return {
    isOnline,
  }
}

const Connection = hookToRenderProps(useConnection)
const withConnection = hookToHOC(useConnection)

export {Connection, withConnection, useConnection}

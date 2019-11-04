/* A toast that only appears if the user is offline
 */

import React from 'react'
import {useConnection} from '../online/online'

const style = {
  backgroundColor: 'red',
  padding: 20,
}

const OnlineToast = () => {
  const {isOnline} = useConnection()
  return isOnline ? null : <div style={style}> You are offline</div>
}

export default OnlineToast

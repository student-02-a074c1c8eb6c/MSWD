import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notifi = useSelector((state) => state.notifi)

  if (notifi === null) {
    return null
  }

  if (notifi.type === 'success') {
    return (
      <div>
        <Alert variant="success">
          {notifi.message}
        </Alert>
      </div>)
  } else {
    return (
      <div>
        <Alert variant="warning">
          {notifi.message}
        </Alert>
      </div>)
  }
}

export default Notification

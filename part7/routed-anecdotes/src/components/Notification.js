import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notifi }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notifi === null) {
    return null
  }

  return <div style={style}>{notifi}</div>
}

Notification.propTypes = {
  notifi: PropTypes.string
}

export default Notification

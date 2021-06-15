import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visi, setvisi] = useState(false)

  const hide = { display: visi ? 'none' : '' }
  const show = { display: visi ? '' : 'none' }

  const togglevisi = () => {
    setvisi(!visi)
  }

  useImperativeHandle(ref, () => {
    return {
      togglevisi
    }
  })

  return (
    <div>
      <div style={hide}>
        <button onClick={togglevisi}>{props.buttonLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={togglevisi}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable

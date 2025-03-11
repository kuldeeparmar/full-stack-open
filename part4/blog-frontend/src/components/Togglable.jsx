import PropTypes from 'prop-types'
import { useImperativeHandle, useState } from 'react'

const Togglable = (props) => {

  const { children,buttonLabel,ref } = props
  const [visible,setVisible] = useState(false)


  const hideWhenVisible = { 'display' : visible ? 'none' : '' }
  const showWhenVisible = { 'display' : visible ? '' : 'none' }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref,() => {
    return {
      toggleVisiblity
    }
  })



  return <div>
    <div>
      <button style={hideWhenVisible} onClick={() => toggleVisiblity()}>{buttonLabel}</button>
    </div>
    <div style={showWhenVisible}>
      {children}
      <button  onClick={() => toggleVisiblity()}>cancel</button>
    </div>
  </div>
}

Togglable.proptypes = {
  buttonLabel : PropTypes.string.isRequired,
}

export default Togglable


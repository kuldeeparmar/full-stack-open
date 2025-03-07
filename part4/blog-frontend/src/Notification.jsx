const Notification = (props) => {
  const { errorMessage } = props
  return (
    <div className="errorMessage">
      {errorMessage}
    </div>
  )
}

export default Notification
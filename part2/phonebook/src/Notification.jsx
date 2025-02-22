const Notification = (props) => {
    const {message} = props

    if(message == null){
        return 
    }

    return (
        <div className="message">
            {message}
        </div>
    )
}

export default Notification
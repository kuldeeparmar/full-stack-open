const Button = (props) => {
    const {onClick,text} = props
    return (
        <div>
            <button onClick={onClick}>{text}</button>
        </div>
    )
}

export default Button;
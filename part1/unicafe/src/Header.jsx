const Header = (props) => {
    const {children} = props
    return (
        <div>
            <h2>{children}</h2>
        </div>
    )
}

export default Header;
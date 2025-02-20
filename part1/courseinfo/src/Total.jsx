const Total = (props) => {
    // console.log(props)
    const {parts} = props
    // console.log(parts[0])
    return (
        <div>
            {parts[0].exercises + parts[1].exercises + parts[2].exercises}
        </div>
    )
}

export default Total;
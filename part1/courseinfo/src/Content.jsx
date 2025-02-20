import Part from "./Part"

const Content = (props) => {
    
    const {parts} = props

    console.log(parts[0])

    return (
        <div>
            <Part part={parts[0]} />
            <Part part={parts[1]} />
            <Part part={parts[2]} />
        </div>
    )
}

export default Content;
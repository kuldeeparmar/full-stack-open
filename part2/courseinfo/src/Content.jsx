import Part from "./Part"

const Content = (props) => {
    
    const {parts} = props

    const total = parts.reduce((sum,current) => sum + current.exercises , 0)

    // console.log(parts[0])

    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
            <p>Total of {total} exercises</p>
        </div>
    )
}

export default Content;
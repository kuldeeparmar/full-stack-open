const Persons = (props) => {
    const {name , number , handleDelete, id} = props
    return (
        <div>
            {name} {number} 
            <button onClick={() => handleDelete(id,name)}>delete</button>
        </div>
    )
}

export default Persons;
const Persons = (props) => {
    const {searchPersons} = props
    return (
        <div>
            {searchPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons;
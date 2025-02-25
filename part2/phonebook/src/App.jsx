import { useEffect, useState } from 'react'

import Filter from './Filter'

import Form from './Form'

import Person from './Person'

import personsServices from './services/persons'

import Notification from './Notification'

const App = () => {
    const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newPhoneNumber,setNewPhoneNumber] = useState('')
  const [search,setSearch] = useState('')
  const [message,setMessage] = useState(null)

  const searchPersons = persons.filter(person => JSON.stringify(person).toLowerCase().includes(search))

  useEffect(() => {
    console.log('effect')
    
    personsServices
    .getAll()
    .then(initialValues => {
      console.log('response fullfilled')
      setPersons(initialValues);
    })
  },[])

  console.log(`persons ${persons.length} `)

  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    const newPersonObj = {
      name : newName,
      number : newPhoneNumber,
    }

    if(persons.some(person => JSON.stringify(person.name) === JSON.stringify(newPersonObj.name))){
      const message = `${newName} is already in the PhoneBook , want to replace it !!`


      if(confirm(message)){
      const person = persons.find(person => person.name == newName)
      const changedPerson = {...person,name:newName,number:newPhoneNumber}

      console.log(changedPerson)

      personsServices
      .update(changedPerson.id,changedPerson)
      .then(returnedPerson => {
        setMessage(
          `${newName} number Changed !!`
        )
        setTimeout(() => {
          setMessage(null)
        },5000)
        setPersons(persons.map(p => p.id === changedPerson.id ? returnedPerson : p))
      })
      .catch(error => {
        setMessage(
          `${newName} is already Deleted from Server`
        )

        setTimeout(() => {
          setMessage(null)
        },5000)

        setPersons(persons.filter(p => p.id !== changedPerson.id))


      })
    }
    }
    else{
      personsServices
      .create(newPersonObj)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson));
        setMessage(
          `Added ${returnedPerson.name}`
        )

        setTimeout(() => {
          setMessage(null)
        },5000)
      })
      .catch(error => {
        console.log(error)
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
        },5000)
      })
      
    }

    setNewPhoneNumber('');
    setNewName('');
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const handleDelete = (id,name) => {
    const message = `Delete ${name}`
    if(confirm(message)){
      personsServices
      .deletePerson(id)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.filter(persons => persons.id !== id))

      })
      
    }

  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>Add new Number </h2>

      <Form handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} 
            handlePhoneNumberChange={handlePhoneNumberChange} newPhoneNumber={newPhoneNumber}/>
      
      <h2>Numbers</h2>


      {searchPersons.map(searchPerson => <Person id ={searchPerson.id} key={searchPerson.id} name={searchPerson.name} 
                          number={searchPerson.number} handleDelete={handleDelete}/>)}

    </div>
  )
}

export default App
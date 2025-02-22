import { useEffect, useState } from 'react'

import Filter from './Filter'

import Form from './Form'

import Persons from './Persons'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newPhoneNumber,setNewPhoneNumber] = useState('')
  const [search,setSearch] = useState('')

  const searchPersons = persons.filter(person => JSON.stringify(person).toLowerCase().includes(search))

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(respose => {
      console.log('response fullfilled')
      setPersons(respose.data);
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
      alert(`${newName} is already in the PhoneBook !!`)
    }
    else{
      setPersons(persons.concat(newPersonObj));
      setNewPhoneNumber('');
    }

    setNewName('');
    
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>Add new Number </h2>

      <Form handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} 
            handlePhoneNumberChange={handlePhoneNumberChange} />
      
      <h2>Numbers</h2>

      <Persons searchPersons={searchPersons} />

    </div>
  )
}

export default App
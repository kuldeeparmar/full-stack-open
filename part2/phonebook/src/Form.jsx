const Form = (props) => {
    const {handleChange,newName,newPhoneNumber,handlePhoneNumberChange,handleSubmit} = props
    return (
        <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
          <br />
          <br />
          phone: <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form;
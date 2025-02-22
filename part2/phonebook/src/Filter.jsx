const Filter = (props) => {
    const {search,handleSearchChange} = props;

    return (
        <div>
        filter shown with : <input value={search} onChange={handleSearchChange}/>
      </div>
    )
}

export default Filter
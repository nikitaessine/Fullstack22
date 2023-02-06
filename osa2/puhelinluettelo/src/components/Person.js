const Person = ({ filteredPersons, deletePerson }) => {
    return (
        <div>
        {filteredPersons.map(person => 
          <p key={person.id}> 
            {person.content} {person.number}
            <button onClick={() => deletePerson(person)}>delete</button>
          </p>
        )}
      </div>
      )
    }
  export default Person
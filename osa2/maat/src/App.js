import React, { useState, useEffect } from "react"
import axios from "axios"
import Display from "./components/Display"

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')

  const countriesToShow = countries.filter(country => {
    return country.name.common.toLowerCase().includes(filter.toLowerCase())
  })

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled")
      setCountries(response.data)
    })
  }, [])

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      find countries: <input value={filter} onChange={handleNewFilter} />
      <Display
        countries={countriesToShow}
        filter={filter}
        setNewFilter={setNewFilter}
      />
    </div>
  )
}

export default App

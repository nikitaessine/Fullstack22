import React from "react"
import Country from "./Country"


const Display = ({countries, filter, setNewFilter}) => {

    const handleClick = (name) => {
        setNewFilter(name)
    }
    if (filter === "") {
        return null
    }
    if (countries.length > 10){ 
        return (<div>Too many matches, specify another filter</div>)
    } else if (countries.length === 1) {
        return (
            <div>
              <Country country={countries[0]} />
            </div>
          )
    }else {
        return (
            <div>
            {countries.map(country => 
              <p key={country.name.common}>
                {country.name.common}{' '}
                <button onClick={() => handleClick(country.name.common)}>show</button>
              </p>
            )}
          </div>
          )
    }
}

export default Display
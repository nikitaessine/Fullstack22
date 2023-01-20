import React from "react"

const Country = ({country}) => {
    const image = country.flags.png


    return (
        <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => 
            <li key={language}> 
              {language} 
            </li>
          )}
        </ul>
        <img src={image} width="150px" height="auto"></img>
      </div>
      ) 
}

export default Country
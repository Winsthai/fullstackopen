import { useState } from "react"
import axios from 'axios'

const Countries = ({countries}) => {
  // If there are too many countries that match filter
  if (countries.length > 10) {
    return (
      <>
        <div>Too many matches, specify another filter</div>
      </>
    )
  }

  // If one country matches exactly
  else if (countries.length == 1) {
    return (
      <CountryMain country={countries[0]}></CountryMain>
    )
  }

  // If 10 or less countries match filter
  return (
    <>
      {countries.map(country => 
        <div key={country.name.common}>{country.name.common} <br/> </div>
      )}
    </>
  )
}

const CountryMain = ({country}) => {

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital} <br></br>
      area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>
            {value}
          </li>
        ))}
      </ul>
      <img src={country.flags.svg} width="150" height="200"></img>
    </>
  )
}

const App = () => {

  const findCountries = (event) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const valid_countries = response.data.filter(c => 
          c.name.common.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setCountries(valid_countries)
      })
  }

  const [countries, setCountries] = useState([])

  return (
    <div>
      find countries &nbsp;
      <input onChange={findCountries}></input>
      <Countries countries={countries}></Countries>
    </div>
  )
}

export default App
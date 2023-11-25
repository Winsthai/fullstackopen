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
      <CountryInfo country={countries[0]}></CountryInfo>
    )
  }

  // If 10 or less countries match filter
  return (
    <>
      {countries.map(country => 
        <Country key={country.area} country={country}></Country>
      )}
    </>
  )
}

const Country = ({country}) => {
  const [isToggled, setIsToggled] = useState(false)

  const handleButtonClick = () => {
    setIsToggled(!isToggled)
  }

  return (
    <div key={country.name.common}>{country.name.common} &nbsp;
      <button onClick={handleButtonClick}> {isToggled ? 'hide' : 'show'} </button>
      <CountryInfo country={isToggled ? country : null}></CountryInfo>
    </div>
  )
}

const CountryInfo = ({country}) => {
  if (country == null) {
    return
  }

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital} <br></br>
      area: {country.area}</p>
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
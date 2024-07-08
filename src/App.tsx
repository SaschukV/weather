import React, { useState } from "react"
import "./App.css"
import Weather from "./Weather"

function App() {
  const [city, setCity] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [weather, setWeather] = useState<{
    temp: number
    description: string
  } | null>(null)

  const fetchWeather = () => {
    const apiKey = "7195bce535ce7bdb80a16621873a6ef8"
    // const city = "Kharkiv"
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        if (json.cod === "404") {
          setError("City not found")
          setWeather(null)
        } else {
          setWeather({
            temp: Math.ceil(json.main.temp - 273.15),
            description: json.weather[0].description,
          })
          setError(null)
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error)
        setError("An error occurred")
        setWeather(null)
      })
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.currentTarget.value)
          }}
          placeholder="Enter city"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {weather && (
        <Weather temp={weather.temp} description={weather.description} />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

export default App

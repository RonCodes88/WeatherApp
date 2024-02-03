import "./App.css";
import { useState } from "react";

const api = {
  key: "xxxxxxxxxxxx",
  base: "http://api.openweathermap.org/data/2.5/",
};

let hasError = false;
const handleFetch = async (search) => {
  const res = await fetch(
    `${api.base}weather?q=${search}&units=metric&APPID=${api.key}`
  );

  if (res.status !== 200) {
    const error = await res.json();
    hasError = true;
    throw { message: error.message, status: error.cod };
  }
  hasError = false;
  const data = await res.json();
  return data;
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState({ error: false, status: "" });

  const searchPressed = async () => {
    try {
      let weatherData = await handleFetch(search);
      setWeather(weatherData);
    } catch (err) {
      setError({ error: err.message, status: err.status });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Header */}
        <h1>Weather App</h1>
        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town/country..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>
        {hasError ? <p>Weather Not Found</p> : null}
        {typeof weather.main !== "undefined" ? (
          <div>
            {/* Location */}
            <p>{weather.name}</p>
            {/* Temperature in C */}
            <p>{weather.main.temp} Degrees Celsius</p>
            {/* Weather Condition  */}
            <p>{weather.weather[0].main}</p>
            <p>{weather.weather[0].description}</p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;

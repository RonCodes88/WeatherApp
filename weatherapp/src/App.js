import "./App.css";
import { useState } from "react";

const api = {
  key: "4dee4a69b8f2a6628610f505969671fc",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
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

        {/* Location */}
        <p>{weather.name}</p>

        {/* Temperature F/C */}
        <p>{weather.main.temp} Degrees Celsius</p>

        {/* Weather Condition  */}
        <p>{weather.weather[0].main}</p>
        <p>{weather.weather[0].description}</p>
      </header>
    </div>
  );
}

export default App;

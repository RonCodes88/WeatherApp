import "./App.css";
import { useState } from "react";

const api = {
  key: "xxxxxxxxxxxx",
  base: "http://api.openweathermap.org/data/2.5/",
};



function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const [errorOccurred, setErrorOccurred] = useState(false);

  const searchPressed = async () => {
    try {
      setErrorOccurred(false);
      let url = `${api.base}weather?q=${search}&units=metric&APPID=${api.key}`;
      const response = await fetch(url);
      const weatherData = await response.json();
      setWeather(weatherData);
      if (weatherData.cod !== "404") {
        setErrorOccurred(false);
      } else {
        setErrorOccurred(true);
      }
    } catch (err) {
      setErrorOccurred(true);
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
        
        {errorOccurred ? <p>Error 404: Weather Not Found</p> : ""}
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Card, Typography, Box } from "@mui/material";

const API_KEY = "4269a03a3b6b2186867224405855c81c";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cachedWeather = localStorage.getItem("weatherData");
    if (cachedWeather) {
      const { data, timestamp } = JSON.parse(cachedWeather);
      if (Date.now() - timestamp < 300000) {
        setWeather(data);
      }
    }
  }, []);

  const fetchWeather = async () => {
    try {
      setError(null);
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeather(response.data);
      localStorage.setItem(
        "weatherData",
        JSON.stringify({ data: response.data, timestamp: Date.now() })
      );
    } catch (err) {
      setError("City not found or API error.");
      setWeather(null);
    }
  };

  return (
    <Container sx={{ textAlign: "center", marginTop: "20px" }}>
      <TextField
        label="Enter city name"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={fetchWeather}>
        Get Weather
      </Button>

      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      {weather && (
        <Card sx={{ marginTop: 2, padding: 2, textAlign: "center" }}>
          <Typography variant="h6">{weather.name}</Typography>
          <Typography variant="h5">{weather.main.temp}°C</Typography>
          <Typography>{weather.weather[0].description}</Typography>
          <Box
            component="img"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            sx={{ width: 80, height: 80, margin: "10px auto" }}
          />
          <Typography variant="body2" color="textSecondary">
            Last updated: {new Date(weather.dt * 1000).toLocaleTimeString()}
          </Typography>
        </Card>
      )}
    </Container>
  );
};

export default WeatherApp;

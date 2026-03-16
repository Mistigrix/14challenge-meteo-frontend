

import { useState } from "nuxt/app";

export const useWeather = () => {

  const weatherTypes: Record<string, { label: string; icon: string; bg: string }> = {
    sunny:        { label: 'Ensoleillé',             icon: '☀️',  bg: 'linear-gradient(135deg, #FF8C00, #FFB347, #FFD700)' },
    cloudy:       { label: 'Nuageux',                icon: '☁️',  bg: 'linear-gradient(135deg, #8E9EAB, #B0BEC5, #CFD8DC)' },
    rainy:        { label: 'Pluvieux',               icon: '🌧️', bg: 'linear-gradient(135deg, #2C3E50, #4CA1AF, #536976)' },
    stormy:       { label: 'Orageux',                icon: '⛈️', bg: 'linear-gradient(135deg, #1A1A2E, #16213E, #0F3460)' },
    partlyCloudy: { label: 'Partiellement nuageux',  icon: '⛅',  bg: 'linear-gradient(135deg, #74b9ff, #a29bfe, #dfe6e9)' },
    clear:        { label: 'Dégagé',                 icon: '🌙',  bg: 'linear-gradient(135deg, #0c0c2e, #1a1a4e, #2d2d7e)' },
  }

  const cities = [
    { name: 'Abidjan',      country: "Côte d'Ivoire", temp: 31, feels: 34, humidity: 78, wind: 12, uv: 9,  weather: 'sunny',        forecast: [32,30,29,33,31,30,28], forecastW: ['sunny','partlyCloudy','rainy','sunny','sunny','partlyCloudy','rainy'] },
    { name: 'Yamoussoukro', country: "Côte d'Ivoire", temp: 29, feels: 32, humidity: 72, wind: 8,  uv: 8,  weather: 'partlyCloudy', forecast: [29,28,27,30,31,29,28], forecastW: ['partlyCloudy','cloudy','rainy','sunny','sunny','partlyCloudy','cloudy'] },
    { name: 'Bouaké',       country: "Côte d'Ivoire", temp: 33, feels: 36, humidity: 65, wind: 10, uv: 10, weather: 'sunny',        forecast: [33,34,32,31,30,33,34], forecastW: ['sunny','sunny','partlyCloudy','cloudy','rainy','sunny','sunny'] },
    { name: 'Dakar',        country: 'Sénégal',        temp: 26, feels: 28, humidity: 60, wind: 18, uv: 7,  weather: 'partlyCloudy', forecast: [26,25,27,28,26,25,24], forecastW: ['partlyCloudy','cloudy','sunny','sunny','partlyCloudy','cloudy','rainy'] },
    { name: 'Lagos',        country: 'Nigéria',         temp: 30, feels: 33, humidity: 80, wind: 14, uv: 8,  weather: 'rainy',        forecast: [30,29,28,31,30,29,27], forecastW: ['rainy','rainy','stormy','partlyCloudy','sunny','rainy','rainy'] },
    { name: 'Nairobi',      country: 'Kenya',           temp: 22, feels: 21, humidity: 55, wind: 16, uv: 6,  weather: 'cloudy',       forecast: [22,21,20,23,24,22,21], forecastW: ['cloudy','rainy','rainy','partlyCloudy','sunny','cloudy','rainy'] },
    { name: 'Paris',        country: 'France',          temp: 14, feels: 11, humidity: 70, wind: 22, uv: 3,  weather: 'cloudy',       forecast: [14,12,13,15,16,14,13], forecastW: ['cloudy','rainy','rainy','partlyCloudy','sunny','cloudy','rainy'] },
    { name: 'New York',     country: 'États-Unis',      temp: 8,  feels: 4,  humidity: 50, wind: 28, uv: 2,  weather: 'clear',        forecast: [8,6,5,9,11,10,7],     forecastW: ['clear','cloudy','rainy','partlyCloudy','sunny','clear','cloudy'] },
  ]

  
  const selectedCity = useState('selectedCity', () => cities[0])

  return {
    weatherTypes,
    cities,
    selectedCity,
  }
}
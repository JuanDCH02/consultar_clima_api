import sytles from './WeatherDetail.module.css'
import type { Weather } from '../../hooks/useWeather'
import { formatTemperature } from '../../utils'

type WeatherDetailProps = {
    weather: Weather
}

export const WeatherDetail = ({weather}: WeatherDetailProps) => {
  return (
    <>
    <div className={sytles.container}>
        <h2>Clima de: {weather.name}</h2>
        <p className={sytles.current}>{formatTemperature(weather.main.temp).toFixed(1)}&deg;C</p>
        <p className={sytles.feel}>feels like: <span>{formatTemperature(weather.main.feels_like).toFixed(1)}&deg;C</span></p>
        <div className={sytles.maxmin}>
            <p>Min: <span>{formatTemperature(weather.main.temp_min).toFixed(1)}&deg;C</span></p>
            <p>Min: <span>{formatTemperature(weather.main.temp_max).toFixed(1)}&deg;C</span></p>
        </div>
    
    </div>
    
        
    </>
  )
}

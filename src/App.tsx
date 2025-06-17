import styles from './App.module.css'
import { Form } from './components/Form/Form'
import useWeather from './hooks/useWeather'
import {Spinner} from './components/Spinner/Spinner'
import {Alert} from './components/Alert/Alert'
import { WeatherDetail } from './components/WeatherDetail/WeatherDetail'


function App() {
  
  const {fetchWeather, weather, hasWeatherData, loading, notFound} = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de Climas</h1>

      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        />
        {loading && <Spinner></Spinner> }
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>ciudad no encontrada</Alert> }
        
      </div>
    </>
  )
}

export default App

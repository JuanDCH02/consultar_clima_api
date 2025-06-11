import axios from 'axios';

import type { SearchType } from '../types';

export default function useWeather () {


    const fetchWeather = async(search : SearchType) =>{

        const appId = import.meta.env.VITE_API_KEY
        try{
            //hago el primer llamado a la api con el nombre de la ciudad y el codigo pais
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const {data} = await axios(geoUrl)
            //del objeto que retorna tomo los valores de latitud y longitud
            const lat = data[0].lat
            const lon = data[0].lon
            //hago el degundo llamado a la api con los datos anteriores
            const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${appId}`
            //console.log(weather)
            const {data: weatherResult} = await axios(weatherUrl)
            console.log(weatherResult)
        }
        catch(error){
            console.log(error)
        }
    }

    return{
        fetchWeather
    }
}


import axios from 'axios';
import {z} from 'zod'

import type { SearchType, Weather } from '../types';



//ZOD
//const Weather = z.object({
//    //infiero los datos a recibir de la api
//    current: z.object({
//        temp: z.number(),
//        feels_like: z.number()
//    }), 
//    daily: z.array(
//        z.object({
//            temp: z.object({ max: z.number(), min: z.number() })
//        })
//    )
//})
//type Weather = z.infer<typeof Weather>

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
            //obtengo los datos de la segunda llamada a la api
            const {data:weatherResult} = await axios(weatherUrl)

            //ZOD
            //busco los datos que necesito casteandolo con el schema de zod 
            //const result = Weather.safeParse(weatherResult)
            //if(result.success){
            //    console.log(result.data.daily[0].temp.max)
            //}
            
        }
        catch(error){
            console.log(error)
        }
    }

    return{
        fetchWeather
    }
}


import { useMemo, useState } from 'react';
import axios from 'axios';
import {z} from 'zod'

import type { SearchType } from '../types';

const Weather = z.object({
    //infiero los datos a recibir de la api v3
    name: z.string(),
    main: z.object({
        temp: z.number(),
        feels_like: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})
export type Weather = z.infer<typeof Weather>


export default function useWeather () {

    const [weather,setWeather] = useState<Weather>({
        name:'',
        main:{
            temp:0,
            feels_like:0,
            temp_max:0,
            temp_min:0,
        }
    })

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
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            //obtengo los datos de la segunda llamada a la api
            const {data:weatherResult} = await axios(weatherUrl)
            //console.log(weatherResult)
            //busco los datos que necesito casteandolo con el schema de zod 
            const result = Weather.safeParse(weatherResult)
            if(result.success){
                //si obtengo los resultados los meto a mi state del clima
                setWeather(result.data)
            }
        }
        catch(error){
            console.log(`TIENES UN ERROR MI REY: ${error}`)
        }
    }

    //valido que mi state tenga datos
    const hasWeatherData = useMemo(() => weather.name , [weather] )

    return{
        weather,
        fetchWeather,
        hasWeatherData
    }
}


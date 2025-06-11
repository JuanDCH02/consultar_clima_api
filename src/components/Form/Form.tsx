import { countries } from "../../data/countries"
import { Alert } from "../../Alert/Alert"
import { useState } from "react"

import type { SearchType } from "../../types"

import styles from './Form.module.css'

type FormProp={
    fetchWeather: (search: SearchType) => Promise<void>
}

export const Form = ({fetchWeather}: FormProp) => {

    const [search, setSearch] = useState<SearchType>({
        city:'',
        country:''
    })
    const [alert, setAlert] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
        setSearch({
            //guardo lo que tiene el input segun el selector de donde se produce el cambio
            ...search,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        //vlaido que se hayan cargado los datos
        if(Object.values(search).includes('')){
            setAlert('todos los campos son obligatorios')
            return
        }
        fetchWeather(search)
    }

  return (
    <form className={styles.form}
        onSubmit={handleSubmit}
        >
        {alert && <Alert>{alert}</Alert>  /*si tengo algun error lo muestro */}

        <div className={styles.field}>
            <label htmlFor="city">
                Ciudad:
            </label>
            <input 
                type="text"
                name='city'
                placeholder='ciudad'
                value={search.city}
                onChange={handleChange}
            />
        </div>

        <div className={styles.field}>
            <label htmlFor="country">Pais:</label>
            <select 
                name="country" 
                value={search.country} 
                onChange={handleChange}>
                <option value="">-- Seleccione un Pais --</option>
                {countries.map(country => (
                    <option
                        key={country.code}
                        value={country.code}
                    >{country.name}
                    </option>
                ))}
            </select>
        </div>
        
        <input className={styles.submit} 
            type="submit"
            value='Consultar Clima'
        />
    </form>
  )
}

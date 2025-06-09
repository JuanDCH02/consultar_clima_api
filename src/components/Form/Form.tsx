import { countries } from "../../data/countries"
import { useState } from "react"
import styles from './Form.module.css'
import type { SearchType } from "../../types"


export const Form = () => {

    const [search, setSearch] = useState<SearchType>({
        city:'',
        country:''
    })
    const handleChange =(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
        setSearch({
            //guardo lo que tiene el input segun el selector de donde se produce el cambio
            ...search,
            [e.target.name] : e.target.value
        })
    }

  return (
    <form className={styles.form}>
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

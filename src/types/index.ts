export type SearchType = {
    city: string
    country: string
}
export type Country = {
    code:string
    name:string
}

export type Weather = {
    current:{
        feels_like:number,
        temp:number
    },
    daily:[
        temp:{
            max:number,
            min:number
        }
    ]
}
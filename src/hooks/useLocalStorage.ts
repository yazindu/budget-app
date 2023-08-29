import {useEffect, useState} from "react";

export const useLocalStorage = <T>(key: string, initialValue: T | (()=>T)) => { //<T> for generic
    const [value, setValue] = useState<T>(()=>{
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)

        if(typeof initialValue === "function"){
            return (initialValue as () => T)() //explicitly tell TS that this initial value is a type of this invocable function that returns type T
        } else return initialValue
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}

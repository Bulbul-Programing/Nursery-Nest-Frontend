import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T, delay = 2500) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            setDebounceValue(value)
        }, delay)

        return ()=>clearTimeout(timeOut)
    },[value, delay])
    return debounceValue
};

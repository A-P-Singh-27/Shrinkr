import { useState } from "react";

export const useFetch = (callback , options = {})=>{
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(null);
    const [error,setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await callback(options, ...args);
            // console.log(response);
            
            setData(response);
        } catch (error) {
            setError(error);
        }
        finally{
            setLoading(false);
        }
    };

    return {data, loading, error, fn};


}
import { getCurrentUser } from "@/db/apiAuth"
import { useFetch } from "@/hooks/use-fetch"
import { createContext, useContext, useEffect } from"react"

const UrlContext = createContext()

export const UrlProvider = ({children}) =>{
    const {data: user ,loading, fn: fetchUser  } = useFetch(getCurrentUser);
    // console.log(user);
    
    const isAuthenticated = user?.role === "authenticated";

    useEffect(()=>{
        fetchUser();
    },[]);

    return (<UrlContext.Provider
        value={{user, fetchUser, loading, isAuthenticated}}
    >
        {children}
    </UrlContext.Provider>
    );
};
export const UrlState = ()=>{
    return useContext(UrlContext);
}


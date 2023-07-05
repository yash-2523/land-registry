import { createContext, useState } from "react";

export const globalLoadingContext = createContext();

export default function GlobalLoadingContextProvider({children}) {
    
        const [globalLoading, setGlobalLoading] = useState(true);
        return (
            <globalLoadingContext.Provider value={{globalLoading, setGlobalLoading}}>
                {children}
            </globalLoadingContext.Provider>
        )
}
import { createContext,useEffect,useState } from "react";

const DataContext=createContext({})

export const dataProvider =({children})=>{
    return(
        <DataContext.Provider value={{

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
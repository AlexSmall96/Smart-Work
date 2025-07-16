import React, { createContext, useState, useContext } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const CalendarContext = createContext()

export const CalendarProvider = ({ children }) => {

    const [year, setYear] = useState(new Date().getFullYear());
    
    
    
    const [taskFilter, setTaskFilter] = useState('all-tasks');
    
    return (
        <CalendarContext.Provider value={{year, setYear, taskFilter, setTaskFilter}}>
            {children}
        </CalendarContext.Provider>
    )
}

export const useCalender = () => useContext(CalendarContext)
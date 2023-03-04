import React from 'react'

interface SettingsContextType {
    useLines: boolean 
    showLabels: boolean 
    horizontalTicks: number
}

export const SettingsContext = React.createContext<SettingsContextType>({
    useLines: false,
    showLabels: true, 
    horizontalTicks: 5
})

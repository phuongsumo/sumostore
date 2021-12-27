import React, { createContext, useState } from 'react'

var favoritesStatus = JSON.parse(localStorage.getItem('favorites'))
const FavoritesContext = createContext(favoritesStatus)
const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(favoritesStatus)

    const handleFavorites = (data) => {
        favorites.push(data)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        favoritesStatus = JSON.parse(localStorage.getItem('favorites'))
        setFavorites(favoritesStatus)
    }

    const handleDeleteFavorites = (data) => {
        const indexOfData = favorites.findIndex(e => e.name === data.name && e.price === data.price && e.image === data.image)
        favorites.splice(indexOfData, 1)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        favoritesStatus = JSON.parse(localStorage.getItem('favorites'))
        setFavorites(favoritesStatus)
    }

    return (
        <FavoritesContext.Provider value={{ favorites, handleFavorites, handleDeleteFavorites }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export { FavoritesProvider, FavoritesContext }

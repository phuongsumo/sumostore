import React, { createContext, useState } from 'react'

var userStatus = JSON.parse(localStorage.getItem('user'))
const UserContext = createContext(userStatus)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(userStatus)

    const login = (data) => {
        const userChange = JSON.stringify({
            id: data.id,
            username: data.username,
            password: data.password,
            name: data.name,
            email: data.email,
            phone: data.phone,
            auth: true
        })
        localStorage.setItem('user', userChange)
        userStatus = JSON.parse(localStorage.getItem('user'))
        setUser(userStatus)
    }

    const logout = () => {
        const userChange = JSON.stringify({
            id: '',
            avatar: '',
            username: '',
            password: '',
            name: '',
            email: '',
            phone: '',
            auth: false
        })
        localStorage.setItem('user', userChange)
        localStorage.removeItem('favorites')
        localStorage.setItem('favorites', JSON.stringify([]))
        userStatus = JSON.parse(localStorage.getItem('user'))
        setUser(userStatus)
        window.location.reload()
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }

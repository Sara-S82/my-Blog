import React, { createContext, useContext, useEffect, useState } from 'react';
export const AuthoContext = createContext();

export const AuthoProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    useEffect(() => {
        const savetoken = localStorage.getItem("token")
        const savedUser = localStorage.getItem("user")
        if (savetoken && savedUser) {
            setToken(savetoken)
            setUser(JSON.parse(savedUser))
        }
    }, []);

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem("token", userToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");

    }
    return (
        <AuthoContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthoContext.Provider>
    );
}


export const useAuth = () => {
    return useContext(AuthoContext);
}
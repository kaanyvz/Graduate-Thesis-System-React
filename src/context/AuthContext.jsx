import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {

            setUser({ token: storedToken });
        }
    }, []);

    const login = (userData) => {
        setUser({ token: userData.access_token });
        localStorage.setItem('access_token', userData.access_token);
    };

    const logout = async () => {
        const confirmLogout = window.confirm("Are you sure want to logout?");
        if(!confirmLogout){
            return;
        }
        try{
            const response = await fetch(`${process.env.REACT_APP_GTS_URL}/api/v1/auth/logout`,{
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                }
            });

            if(!response.ok){
                console.error("Logout Failed...");
                return;
            }
            setUser(null);
            localStorage.removeItem('access_token');
        }catch (error){
            console.error("Error during logout: ", error);
        }

    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
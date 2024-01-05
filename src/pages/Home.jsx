import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode"
import {useAuthContext} from "../context/AuthContext";


function Home() {
    const { user } = useAuthContext();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {

        // console.log(user)
        if (user && user.token) {
            try {
                const decodedToken = jwtDecode(user.token);
                // console.log(decodedToken);
                const userEmailFromToken = decodedToken?.sub || '';
                setUserEmail(userEmailFromToken);
            } catch (error) {
                console.error('error decoding jwt :', error);
            }
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center h-screen border-x-gray-600 text-white">
            <div className="text-4xl font-bold mb-6">
                {userEmail ? (
                    `Welcome!`
                ) : (
                    'Welcome!'
                )}
            </div>
            <p className={"text-lg mb-8"}>
                Welcome to Graduate Thesis System.
            </p>
            <div className={"text-left mb-4"}>
                <p className={"mb-3"}>
                    <strong>Search Theses: </strong>Go to 'search in detail' if you want to search thesis in details.
                </p>
                <p className={"mb-3"}>
                    <strong>Create Theses: </strong>Go to 'create theses' after you register, and create theses yourself.
                </p>
                <p className={"mb-3"}>
                    <strong>My Theses: </strong>Go to 'my theses' after you register, and make some operations like update or delete.
                </p>
            </div>
        </div>
    );
}

export default Home;
import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const Login = () => {
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const url = process.env.REACT_APP_GTS_URL
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const notify = (message, type = 'success') => {
        toast(message, {
            type: type,
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch(`${url}/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                console.error('Login failed');
                return;
            }

            const data = await response.json();
            login(data);
            localStorage.setItem('access_token', data.access_token);
            notify('You logged in successfully!\nYou will be redirected to the home page in 3 seconds.', 'success');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('err during login:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    }

    return (
        <section>
            <div className={"flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"}>
                <div className={"w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"}>
                    <div className={"p-6 space-y-4 md:space-y-6 sm:p-8"}>
                        <h1 className={"text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"}>
                            Sign in to your account
                        </h1>
                        <form className={"space-y-4 md:space-y-6"} action={"#"}>
                            <div>
                                <label htmlFor="email" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>
                                    Email:
                                </label>
                                <input type="email"
                                       name={"email"}
                                       value={email} onChange={(e) => setEmail(e.target.value)}
                                       className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                        placeholder={"Enter your mail address."}
                                       autoComplete={"none"}
                                       required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>
                                    Password:
                                </label>
                                <input type="password"
                                       name={"password"}
                                       value={password} onChange={(e) => setPassword(e.target.value)}
                                       className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                       placeholder={"Enter your password."}
                                       required
                                />
                            </div>

                            <button type="submit"
                                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    onClick={handleSubmit}
                            >Log In</button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </section>

    );
};

export default Login;

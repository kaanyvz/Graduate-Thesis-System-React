import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const RegisterPage = () => {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_GTS_URL
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'USER',
    });

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${url}/v1/auth/register`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if(!response.ok){
                console.error("failed during registration");
                return;
            }
            notify('Your account has created successfully!\nYou will be redirected to the login page in 3 seconds.', 'success');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <section>

            <div className={"flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"}>
                <div className={"w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"}>
                    <div className={"p-6 space-y-4 md:space-y-6 sm:p-8"}>
                        <h1 className={"text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"}>
                            Create Your Account!
                        </h1>
                        <form className={"space-y-4 md:space-y-6"}>

                            <div>
                                <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>
                                    First Name:
                                </label>
                                <input type="text"
                                       id={"firstName"}
                                       name={"firstName"}
                                       value={formData.firstName}
                                       onChange={handleChange}
                                       className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                       placeholder={"Enter your first name"}
                                       autoComplete={"none"}
                                       required
                                />
                            </div>

                            <div>
                                <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>
                                    Last Name:
                                </label>
                                <input type="text"
                                       id={"lastName"}
                                       name={"lastName"}
                                       value={formData.lastName}
                                       onChange={handleChange}
                                       className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                       placeholder={"Enter your last name"}
                                       autoComplete={"none"}
                                       required
                                />
                            </div>

                            <div>
                                <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>
                                    Email:
                                </label>
                                <input type="email"
                                       id={"email"}
                                       name={"email"}
                                       value={formData.email}
                                       onChange={handleChange}
                                       className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                       placeholder={"Enter your mail address."}
                                       autoComplete={"none"}
                                       required
                                />
                            </div>
                            <div>
                                <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>
                                    Password:
                                </label>
                                <input type="password"
                                       id={"password"}
                                       name={"password"}
                                       value={formData.password}
                                       onChange={handleChange}
                                       className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                       placeholder={"Enter your password"}
                                       required
                                />
                            </div>
                            <button type="submit"
                                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    onClick={handleSubmit}
                            >Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>

        </section>

    );
};

export default RegisterPage;

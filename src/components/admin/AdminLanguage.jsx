import React, { useState, useEffect } from 'react';

const AdminLanguage = () => {
    const url = process.env.REACT_APP_GTS_URL
    const [languages, setLanguages] = useState([]);
    const [newLanguageName, setNewLanguageName] = useState('');

    const fetchLanguages = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${url}/v1/language/getAll`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch languages: ${response.statusText}`);
            }

            const data = await response.json();
            setLanguages(data);
        } catch (error) {
            console.error('Error fetching languages:', error.message);
        }
    };

    const createLanguage = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${url}/v1/language/createLanguage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: newLanguageName }),
            });

            if (!response.ok) {
                throw new Error(`Failed to create language: ${response.statusText}`);
            }

            fetchLanguages();
            setNewLanguageName('');
        } catch (error) {
            console.error('Error creating language:', error.message);
        }
    };

    const deleteLanguage = async (id) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${url}/v1/language/deleteLanguage/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete language: ${response.statusText}`);
            }

            fetchLanguages();
        } catch (error) {
            console.error('Error deleting language:', error.message);
        }
    };

    useEffect(() => {
        fetchLanguages();
    }, []);

    return (
        <div className={"my-8 mx-auto max-w-screen-md"}>
            <h3 className={"text-5xl font-extrabold dark:text-white mb-7"}>Language Management</h3>

            <div className={"relative"}>
                <h6 className={"text-lg font-bold dark:text-white"}>Enter Language to save the Databse.</h6>
                <label className={"mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"}>Language Name: </label>
                <input
                    className={"block mb-3 mt-5  w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                    type={"text"}
                    name={"languageName"}
                    value={newLanguageName}
                    onChange={(e) => setNewLanguageName(e.target.value)}
                    placeholder={"Language Name"}
                />
                <button
                    className={"text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                    onClick={createLanguage}>Create</button>
            </div>

            <div className={"relative overflow-x-auto"}>
                <h6 className={"text-lg font-bold dark:text-white"}>Languages List</h6>
                <table className={"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"}>
                    <thead className={"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"}>
                    <tr>
                        <th scope={"col"} className={"px-6 py-3"}>Number</th>
                        <th scope={"col"} className={"px-6 py-3"}>Language Name</th>
                        <th scope={"col"} className={"px-6 py-3"}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {languages.map((language, index) => (
                        <tr key={language.id} className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700"}>
                            <td scope={"row"} className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"}>
                                {index + 1}
                            </td>
                            <td>
                                {language.name}
                            </td>
                            <td>
                                <button
                                    onClick={() => deleteLanguage(language.id)}
                                    className={"text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"}
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default AdminLanguage;

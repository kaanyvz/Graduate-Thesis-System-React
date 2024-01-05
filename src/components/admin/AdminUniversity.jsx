import React, { useState, useEffect } from 'react';

const AdminUniversity = () => {
    const url = process.env.REACT_APP_GTS_URL
    const [universities, setUniversities] = useState([]);
    const [newUniversityName, setNewUniversityName] = useState('');

    const fetchUniversities = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${url}/v1/university/getAllUniversities`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch universities: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            setUniversities(data);
        } catch (error) {
            console.error('Error fetching universities:', error.message);
        }
    };

    const createUniversity = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${url}/v1/university/createUniversity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: newUniversityName }),
            });

            if (!response.ok) {
                throw new Error(`Failed to create university: ${response.statusText}`);
            }

            fetchUniversities();
            setNewUniversityName('');
        } catch (error) {
            console.error('Error creating university:', error.message);
        }
    };

    const deleteUniversity = async (id) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${url}/v1/university/deleteUniversity/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete university: ${response.statusText}`);
            }

            fetchUniversities();
        } catch (error) {
            console.error('Error deleting university:', error.message);
        }
    };

    useEffect(() => {
        fetchUniversities();
    }, []);

    return (
        <div className={"my-8 mx-auto max-w-screen-md"}>
            <h3 className={"text-5xl font-extrabold dark:text-white mb-7"}>University Management</h3>

            <div className={"relative"}>
                <h6 className={"text-lg font-bold dark:text-white"}>Enter University to save the Databse.</h6>
                <label className={"mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"}>Thesis Title: </label>
                <input
                    className={"block mb-3 mt-5  w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                    type={"text"}
                    name={"thesis_title"}
                    value={newUniversityName}
                    onChange={(e) => setNewUniversityName(e.target.value)}
                    placeholder={"University Name"}
                />
                <button
                    className={"text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                    onClick={createUniversity}>Create</button>
            </div>

            <div className={"relative overflow-x-auto"}>
                <h6 className={"text-lg font-bold dark:text-white"}>Universities List</h6>
                <table className={"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"}>
                    <thead className={"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"}>
                        <tr>
                            <th scope={"col"} className={"px-6 py-3"}>Number</th>
                            <th scope={"col"} className={"px-6 py-3"}>University Name</th>
                            <th scope={"col"} className={"px-6 py-3"}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {universities.map((university, index) => (
                        <tr key={university.id} className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700"}>
                            <td scope={"row"} className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"}>
                                {index + 1}
                            </td>
                            <td>
                                {university.name}
                            </td>
                            <td>
                                <button
                                    onClick={() => deleteUniversity(university.id)}
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

export default AdminUniversity;

import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';

const ProfilePage = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [theses, setTheses] = useState([]);

    useEffect(() => {
        const decodedToken = parseJwt(user.token);
        const authorEmail = decodedToken.sub;

        const fetchThesesByAuthorMail = async () => {
            try {
                const apiUrl = `${process.env.REACT_APP_GTS_URL}/v1/thesis/getThesisByAuthorMail?mail=${encodeURIComponent(
                    authorEmail
                )}`;

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setTheses(data);
                } else {
                    console.error('Failed to fetch theses by author mail');
                }
            } catch (error) {
                console.error('Error fetching theses by author mail:', error);
            }
        };

        fetchThesesByAuthorMail();
    }, [user.token]);

    const handleDelete = async (id) => {
        try {
            const apiUrl = `${process.env.REACT_APP_GTS_URL}/v1/thesis/deleteThesisById?id=${id}`;

            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setTheses((prevTheses) => prevTheses.filter((thesis) => thesis.id !== id));
                console.log('Thesis deleted successfully.');
            } else {
                console.error('Failed to delete the thesis');
            }
        } catch (error) {
            console.error('Error deleting the thesis:', error);
        }
    };

    const handleUpdate = (thesisNo) => {
        navigate(`/updateThesis/${thesisNo}`);
    };

    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    };

    return (
        <div>
            <div className={'flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400'} role={'alert'}>
                <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                    />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Thesis Results:</span>
                    <ul className="mt-1.5 list-disc list-inside">
                        <li>You can edit or remove your theses on this page.</li>
                    </ul>
                </div>
            </div>
            <table className={'w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'}>
                <thead className={'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'}>
                <tr>
                    <th scope={'col'} className={'px-6 py-3'}>
                        Thesis No
                    </th>
                    <th scope={'col'} className={'px-6 py-3'}>
                        Author
                    </th>
                    <th scope={'col'} className={'px-6 py-3'}>
                        Year
                    </th>
                    <th scope={'col'} className={'px-6 py-3'}>
                        Thesis Title
                    </th>
                    <th scope={'col'} className={'px-6 py-3'}>
                        Type
                    </th>
                    <th scope={'col'} className={'px-6 py-3'}>
                        Language
                    </th>
                    <th scope={'col'} className={'px-6 py-3'}>
                        University
                    </th>
                    <th scope={'col'} className={'px-6 py-3'}>
                        Institute
                    </th>
                    <th scope={'col'} className={'px-6 py-3'}>
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {theses.map((thesis) => (
                    <tr className={'bg-white border-b dark:bg-gray-800 dark:border-gray-700'} key={thesis.id}>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {thesis.thesisNo}
                        </td>
                        <td className={'px-6 py-4'}>{`${thesis.author.name} ${thesis.author.lastname}`}</td>
                        <td className={'px-6 py-4'}>{new Date(thesis.thesisYear).getFullYear()}</td>
                        <td className={'px-6 py-4'}>{thesis.thesis_title}</td>
                        <td className={'px-6 py-4'}>{thesis.thesis_type}</td>
                        <td className={'px-6 py-4'}>{thesis.language.name}</td>
                        <td className={'px-6 py-4'}>{thesis.university.name}</td>
                        <td className={'px-6 py-4'}>{thesis.institute.name}</td>
                        <td className={'px-6 py-4'}>
                            <button
                                onClick={() => handleDelete(thesis.id)}
                                className={'flex p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 cursor-pointer'}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleUpdate(thesis.thesisNo)}
                                className={'flex p-2 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 cursor-pointer'}
                            >
                                Update
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProfilePage;

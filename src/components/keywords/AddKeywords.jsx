import React, { useState } from 'react';
import { useThesisContext } from '../../context/ThesisContext';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useAuthContext} from "../../context/AuthContext";

function AddKeywords(props) {
    const { thesisNo } = useThesisContext();
    const {user} = useAuthContext()
    const navigate = useNavigate();
    const url = process.env.REACT_APP_GTS_URL;
    const [keywordForm, setKeywordForm] = useState({
        thesisNo: thesisNo,
        keywordNames: [''],
    });

    const handleChange = (index, value) => {
        const updatedKeywords = [...keywordForm.keywordNames];
        updatedKeywords[index] = value;
        setKeywordForm({
            ...keywordForm,
            keywordNames: updatedKeywords,
        });
    };

    const handleAddKeyword = () => {
        setKeywordForm({
            ...keywordForm,
            keywordNames: [...keywordForm.keywordNames, ''],
        });
    };

    const handleRemoveKeyword = (index) => {
        const updatedKeywords = [...keywordForm.keywordNames];
        updatedKeywords.splice(index, 1);
        setKeywordForm({
            ...keywordForm,
            keywordNames: updatedKeywords,
        });
    };
    const notify = (message, type = 'success') => {
        toast(message, {
            type: type,
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/v1/thesis/createThesis/addKeywords`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(keywordForm),
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server Error: ', errorText);

                console.log('Full Response: ', errorText);
                return;
            }

            const responseBody = await response.text();
            console.log('subjectTopic added successfully to thesis: ', responseBody);
            notify('Thesis created successfully!\nYou will be redirected to the home page in 2 seconds.', 'success');
            setTimeout(() => {
                navigate('/');
            }, 2000);


        } catch (e) {
            console.error('Error adding subjectTopic to thesis: ', e);
            notify('Error adding subjectTopic. Please try again.', 'error');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={'max-w-sm mx-auto'}>
                {keywordForm.keywordNames.map((keyword, index) => (
                    <div key={index} className="mb-5">
                        <label
                            htmlFor=""
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Keyword {index + 1}:
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={keyword}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                            {index === keywordForm.keywordNames.length - 1 && (
                                <button
                                    type="button"
                                    className="ml-2 text-blue-700 hover:text-blue-800 focus:outline-none"
                                    onClick={handleAddKeyword}
                                >
                                    +
                                </button>
                            )}
                            {index > 0 && (
                                <button
                                    type="button"
                                    className="ml-2 text-red-600 hover:text-red-800 focus:outline-none"
                                    onClick={() => handleRemoveKeyword(index)}
                                >
                                    -
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button
                    type={'submit'}
                    className={
                        'mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    }
                >
                    ADD KEYWORDS
                </button>

            </form>

            <ToastContainer />
        </div>
    );
}

export default AddKeywords;

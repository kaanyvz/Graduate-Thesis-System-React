import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";
import {toast, ToastContainer} from "react-toastify";

function UpdateKeywords(props) {
    const {user} = useAuthContext();
    const {thesisNo} = useParams();
    const navigate = useNavigate();
    const url = process.env.REACT_APP_GTS_URL;

    const [keywordForm, setKeywordForm] = useState({
        keywordNames: [],
    })
    useEffect(() => {
        const fetchKeywords = async () => {
            try {
                const response = await fetch(`${url}/v1/thesis/findByThesisNo?thesisNo=${thesisNo}`,{
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                });
                const data = await response.json();
                setKeywordForm({
                    keywordNames: data.keywords.map((keyword) => keyword.name)
                });
            }catch (err){
                console.error("Error fetching subjectTopic..", err);
            }
        }
        fetchKeywords()
    }, [url, user.token, thesisNo]);

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

    const handleChange = (index, value) => {
        const updatedKeywords = [...keywordForm.keywordNames];
        updatedKeywords[index] = value;
        setKeywordForm({
            keywordNames: updatedKeywords,
        });
    }

    const handleAddKeyword = () => {
        setKeywordForm({
            keywordNames: [...keywordForm.keywordNames, ''],
        });
    };

    const handleRemoveKeyword = (index) => {
        const updatedKeywords = [...keywordForm.keywordNames];
        updatedKeywords.splice(index, 1);
        setKeywordForm({
            keywordNames: updatedKeywords,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${url}/v1/thesis/updateThesis/updateKeywords`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    thesisNo: parseInt(thesisNo),
                    keywordNames: keywordForm.keywordNames
                })
            })
            if(!response.ok){
                const errText = await response.text();
                console.error("Server Error ", errText);
                return
            }
            const responseBody = await response.text();
            console.log("Response Body: ", responseBody);
            notify('Your thesis updated successfully!\nYou will be redirected to the updated thesis detail in 2 seconds.', 'success');
            setTimeout(() => {
                navigate(`/fullThesisDetails/${thesisNo}`);
            }, 2000);
        }catch (error){
            console.error("Error updating keywords.");
        }
    }

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
                    UPDATE KEYWORDS
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateKeywords;
import React, {useEffect, useState} from 'react';
import {useThesisContext} from "../../context/ThesisContext";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";

function AddSubjectTopic(props) {
    const { user } = useAuthContext()
    const {thesisNo} = useThesisContext();
    const navigate = useNavigate();
    const url = process.env.REACT_APP_GTS_URL;

    const [subjectTopics, setSubjectTopics] = useState([]);
    const [subjectTopicForm, setSubjectTopicForm] = useState({
        thesisNo: thesisNo,
        subjectTopicNames: []
    });


    useEffect(() => {
        const fetchTopics = async () =>{
            try {
                const response = await fetch(`${url}/v1/subjectTopic/getAllTopics`,{
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                })
                const data = await response.json();
                setSubjectTopics(data);
            }catch (error){
                console.error("Error fetching topics...", error);
            }
        }
        fetchTopics();
    }, [])

    const handleSubjectTopicChange = (e) => {
        const selectedTopics = Array.from(e.target.selectedOptions, (option) => option.value);
        setSubjectTopicForm({
            ...subjectTopicForm,
            subjectTopicNames: selectedTopics,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${url}/v1/thesis/createThesis/addSubjectTopics`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subjectTopicForm),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server Error: ", errorText);
                return;
            }

            const responseBody = await response.text();
            console.log("Response Body: ", responseBody);

            console.log("SubjectTopics added successfully: ", responseBody);
            navigate(`/create/addKeywords/${thesisNo}`);
        } catch (error) {
            console.error("Error adding topics to thesis: ", error);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className={"max-w-sm mx-auto"}>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selected Topics</label>
                    <select
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        multiple
                        value={subjectTopicForm.subjectTopicNames}
                        onChange={handleSubjectTopicChange}
                    >
                        {subjectTopics.map((topic) => (
                            <option key={topic.id} value={topic.name}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                </div>



                <button
                    type={"submit"}
                    className={"mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                >
                    ADD TOPICS
                </button>
            </form>
        </div>
    );
}

export default AddSubjectTopic;
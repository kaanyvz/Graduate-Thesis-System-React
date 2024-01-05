import React, {useState} from 'react';
import {useThesisContext} from "../../context/ThesisContext";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";

function CreateSupervisor() {
    const {thesisNo} = useThesisContext();
    const {user} = useAuthContext();
    const navigate = useNavigate();

    const url = process.env.REACT_APP_GTS_URL;
    const [supervisorFormData, setSupervisorFormData] = useState({
        supervisorName: '',
        supervisorLastname: '',
        thesisNo: thesisNo
    })
    const [validationErrors, setValidationErrors] = useState({});

    const handleSupervisorChange = (e) =>{
        const { name, value } = e.target;
        setSupervisorFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value ? '' : "This field cannot be null!",
        }))
    }

    const handleSubmitSupervisor = async (e) => {
        e.preventDefault();
        const errors = {};
        Object.entries(supervisorFormData).forEach(([key, value]) => {
            if(value === null || value === ''){
                errors[key] = "This field cannot be null";
            }
        });
        setValidationErrors(errors);
        if(Object.keys(errors).length > 0){
            return;
        }
        try {
            const response = await fetch(`${url}/v1/thesis/createThesis/addSupervisor`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(supervisorFormData),
            })

            if(!response.ok){
                const error = await response.text();
                console.error("Server Error: ", error);
                return;
            }
            const data = await response.json();
            console.log("Supervisor added successfully: ", data);

            navigate(`/create/subjectTopics/${thesisNo}`);
        }catch (error){
            console.error("Server Error: ", error);
        }
    }

    return (
        <>
            <div className={"flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"} role={"alert"}>
                <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Adding Supervisor:</span>
                    <ul className="mt-1.5 list-disc list-inside">
                        <li>Please enter your supervisor's name and surname correctly.</li>
                    </ul>
                </div>
            </div>
            <div className={"max-w-sm mx-auto"}>
                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Supervisor Name: </label>
                    <input
                        type={"text"}
                        name={"supervisorName"}
                        value={supervisorFormData.supervisorName}
                        onChange={handleSupervisorChange}
                        // disabled={!isThesisSubmitted}
                        className={
                            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}

                    />
                    {validationErrors.supervisorName && (
                        <span className={"text-red-500"}>{validationErrors.supervisorName}</span>
                    )}
                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Supervisor Lastname: </label>
                    <input
                        type={"text"}
                        name={"supervisorLastname"}
                        value={supervisorFormData.supervisorLastname}
                        onChange={handleSupervisorChange}
                        // disabled={!isThesisSubmitted}
                        className={
                            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}

                    />
                    {validationErrors.supervisorLastname && (
                        <span className={"text-red-500"}>{validationErrors.supervisorLastname}</span>
                    )}
                </div>
                <form className={"max-w-sm mx-auto mt-8"} onSubmit={handleSubmitSupervisor}>
                    <button className={"mt-7 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"}>
                        ADD SUPERVISOR
                    </button>
                </form>

            </div>
        </>
    );
}

export default CreateSupervisor;
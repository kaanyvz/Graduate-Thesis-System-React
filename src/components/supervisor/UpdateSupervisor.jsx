import React, {useEffect, useState} from 'react';
import {useThesisContext} from "../../context/ThesisContext";
import {useAuthContext} from "../../context/AuthContext";
import {useNavigate, useParams} from "react-router-dom";

function UpdateSupervisor(props) {
    const { thesisNo } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const url = process.env.REACT_APP_GTS_URL;
    const [validationErrors, setValidationErrors] = useState({});
    const [supervisorFormData, setSupervisorFormData] = useState({
        supervisorName: '',
        supervisorLastname: '',
    });

    useEffect(() => {
        const fetchCurrentSupervisors = async () => {
            try {
                const response = await fetch(`${url}/v1/thesis/findByThesisNo?thesisNo=${thesisNo}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });

                if (!response.ok) {
                    const error = await response.text();
                    console.error("Server Error: ", error);
                    return;
                }
                const thesisData = await response.json();
                console.log(thesisData);
                // setCurrentSupervisors(thesisData.supervisors);
                if(thesisData.supervisors.length > 0){
                    const firstSupervisor = thesisData.supervisors[0];
                    setSupervisorFormData({
                        supervisorName: firstSupervisor.name,
                        supervisorLastname: firstSupervisor.lastname
                    })
                }
            }catch (error){
                console.error("Serverr Error: ", error);
            }
        };

        fetchCurrentSupervisors();
    }, [thesisNo, user.token, url]);

    const handleSupervisorChange = (e) =>{
        const { name, value } = e.target;
        setSupervisorFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value ? '' : 'This field cannot be null!',
        }));
    }

    const handleSubmitSupervisor = async (e) => {
        e.preventDefault();
        const errors = {};
        Object.entries(supervisorFormData).forEach(([key, value]) => {
            if (value === null || value === '') {
                errors[key] = 'This field cannot be null';
            }
        });
        setValidationErrors(errors);
        if (Object.keys(errors).length > 0) {
            return;
        }

        try{
            const response = await fetch(`${url}/v1/thesis/updateSupervisorsInThesis`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: supervisorFormData.supervisorName,
                    lastname: supervisorFormData.supervisorLastname,
                    thesisNo: thesisNo,
                }),
            });
            navigate(`/updateSubjectTopics/${thesisNo}`)
        }catch (errror){
            console.error("sv. error: ", errror);
        }
    }
    return (
        <>
            <form className={'max-w-sm mx-auto'} onSubmit={handleSubmitSupervisor}>
                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Supervisor Name: </label>
                    <input
                        type={"text"}
                        name={"supervisorName"}
                        value={supervisorFormData.supervisorName}
                        onChange={handleSupervisorChange}
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"Enter your supervisor's name"}
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
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"Enter your co-supervisor's last name"}
                    />
                    {validationErrors.supervisorLastname && (
                        <span className={"text-red-500"}>{validationErrors.supervisorLastname}</span>
                    )}
                </div>
                <button className={'mt-7 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'}>
                    UPDATE SUPERVISOR
                </button>
            </form>
        </>
    )
}

export default UpdateSupervisor;
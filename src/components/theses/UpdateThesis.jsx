import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";

function UpdateThesis(props) {
    const navigate = useNavigate();
    const{thesisNo} = useParams();
    const {user} = useAuthContext();
    const url = process.env.REACT_APP_GTS_URL;
    const [thesisId, setThesisId] = useState(null);
    const [isThesisUpdated, setIsThesisUpdated] = useState(false);
    const [universities, setUniversities] = useState([])
    const [institutes, setInstitutes] = useState([])
    const [languages, setLanguages] = useState([])
    const [updateFormData, setUpdateFormData] = useState({
        thesisNo: "",
        authorName: "",
        authorLastname: "",
        thesis_title: "",
        thesis_abstract: "",
        thesis_type: "",
        numberOfPages: 0,
        languageName: "",
        universityName:"",
        instituteName: "",
        coSupervisorName: "",
        coSupervisorLastname:"",
        thesisYear: "",
    })

    useEffect(() => {
        const fetchUniversities = async () => {
            try{
                const universityResponse = await fetch(`${url}/v1/university/getAllUniversities`,{
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                const universitiesData = await universityResponse.json();
                // console.log(universitiesData);
                setUniversities(universitiesData);
            }catch (e){
                console.error("Error fetching universities: ", e);
            }
        };

        const fetchInstitutes = async () => {
            try{
                const instituteResponse = await fetch(`${url}/v1/institute/getAllInstitutes`,{
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                const institutesData = await instituteResponse.json();
                setInstitutes(institutesData);
                // console.log(institutesData);
            }catch (error){
                console.error("Error fetching institutes: ", error);
            }
        }

        const fetchLanguages = async () => {
            try{
                const languageResponse = await fetch(`${url}/v1/language/getAll`,{
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                const languagesData = await languageResponse.json();
                setLanguages(languagesData);
                // console.log(languageData);
            }catch (error){
                console.error("Error fetching languages: ", error);
            }
        }
        fetchUniversities();
        fetchInstitutes();
        fetchLanguages();
    }, [])

    useEffect(() => {
        const fetchThesisDetails = async () => {
            try {
                const response = await fetch(`${url}/v1/thesis/findByThesisNo?thesisNo=${thesisNo}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });

                if (response.ok) {
                    const thesisData = await response.json();
                    setThesisId(thesisData.id);
                    console.log(thesisData)
                    setUpdateFormData({
                        thesisNo: thesisData.thesisNo,
                        thesis_title: thesisData.thesis_title,
                        thesis_abstract: thesisData.thesis_abstract,
                        thesis_type: thesisData.thesis_type,
                        languageName: thesisData.language.name,
                        universityName: thesisData.university.name,
                        instituteName: thesisData.institute.name,
                        authorName: thesisData.author.name,
                        authorLastname: thesisData.author.lastname,
                        coSupervisorName: thesisData.coSupervisor.name,
                        coSupervisorLastname: thesisData.coSupervisor.lastname,
                        thesisYear: thesisData.thesisYear,
                        numberOfPages: thesisData.numberOfPages
                    });
                } else {
                    console.error('Failed to fetch thesis details:', response.status);
                }
            } catch (error) {
                console.error('Error fetching thesis details:', error);
            }
        };

        fetchThesisDetails();
    }, [thesisNo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
       try {
            const response = await fetch(`${url}/v1/thesis/updateThesisById?id=${thesisId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(updateFormData)
            });
            if (response.ok) {
                setIsThesisUpdated(true);
                navigate(`/updateSupervisor/${thesisNo}`)
                console.log("Thesis updated successfully!");

            } else {
                console.error("Failed to update thesis: ", response.status);
            }
        }catch (error){
           console.error("Error updating thesis: ", error);
       }
    }

    const handleChange = (e) => {
        setUpdateFormData({...updateFormData, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <h2>Update Thesis</h2>
            <form onSubmit={handleSubmit}>
                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Thesis No: </label>
                    <input
                        className={"mb-5 bg-gray-100 border border-gray-950 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        type={"number"}
                        name={"thesisNo"}
                        value={updateFormData.thesisNo}
                        onChange={handleChange}
                        placeholder={"Enter Thesis No"}
                        inputMode={"numeric"}
                        onWheel={(e) => e.preventDefault()}
                        disabled
                    />
                </div>
                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Author Name: </label>
                    <input
                        type={"text"}
                        name={"authorName"}
                        value={updateFormData.authorName}
                        onChange={handleChange}
                        className={"mb-5 bg-gray-100 border border-gray-950 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"Enter your name"}
                        disabled
                    />

                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Author Lastname: </label>
                    <input
                        type={"text"}
                        name={"authorLastname"}
                        value={updateFormData.authorLastname}
                        onChange={handleChange}
                        className={"mb-5 bg-gray-100 border border-gray-950 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"Enter your lastname"}
                        disabled
                    />

                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Thesis Title: </label>
                    <input
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        type={"text"}
                        name={"thesis_title"}
                        value={updateFormData.thesis_title}
                        onChange={handleChange}
                        placeholder={"Enter Title"}
                    />
                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Thesis Type: </label>
                    <select
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        name={"thesis_type"}
                        value={updateFormData.thesis_type}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select Thesis Type
                        </option>
                        <option value="Master">Master</option>
                        <option value="Doctorate">Doctorate</option>
                        <option value="Specialization in Medicine">Specialization in Medicine</option>
                        <option value="Proficiency in Art">Proficiency in Art</option>
                    </select>

                </div>

                <div className={"mb-5"}>
                    <label htmlFor={"large-input"} className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Thesis Abstract: </label>
                    <input
                        type={"text"}
                        name={"thesis_abstract"}
                        value={updateFormData.thesis_abstract}
                        onChange={handleChange}
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"Write here about your thesis"}
                    />
                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>University: </label>
                    <select
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        name={"universityName"}
                        value={updateFormData.universityName}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select University
                        </option>
                        {universities.map((university) => (
                            <option key={university.id} value={university.name}>
                                {university.name}
                            </option>
                        ))}
                    </select>

                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Institute: </label>
                    <select
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        name={"instituteName"}
                        value={updateFormData.instituteName}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select Institute
                        </option>
                        {institutes.map((institute) => (
                            <option key={institute.id} value={institute.name}>
                                {institute.name}
                            </option>
                        ))}
                    </select>

                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Language: </label>
                    <select
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        name={"languageName"}
                        value={updateFormData.languageName}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select Language
                        </option>
                        {languages.map((language) => (
                            <option key={language.id} value={language.name}>
                                {language.name}
                            </option>
                        ))}
                    </select>

                </div>

                <div className={"mb-5"}>
                    <label className={" block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Number Of Pages: </label>
                    <input
                        className={"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        type={"number"}
                        name={"numberOfPages"}
                        value={updateFormData.numberOfPages || ""}
                        onChange={handleChange}
                        placeholder={"Enter number of pages"}
                    />

                </div>



                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Co supervisor Name: </label>
                    <input
                        type={"text"}
                        name={"coSupervisorName"}
                        value={updateFormData.coSupervisorName}
                        onChange={handleChange}
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"Enter your co-supervisor's name"}
                    />

                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Co supervisor Lastname: </label>
                    <input
                        type={"text"}
                        name={"coSupervisorLastname"}
                        value={updateFormData.coSupervisorLastname}
                        onChange={handleChange}
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"Enter your co-supervisor's last name"}
                    />

                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Thesis Year: </label>
                    <input
                        type={"datetime-local"}
                        name={"thesisYear"}
                        value={updateFormData.thesisYear}
                        onChange={handleChange}
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"YYYY-MM-DD"}
                    />
                </div>
                {!isThesisUpdated && (
                    <button

                        type={"submit"}
                        className={"mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}>
                        SUBMIT THESIS
                    </button>
                )}
            </form>
        </div>
    );
}

export default UpdateThesis;
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import CreateSupervisor from "../supervisor/CreateSupervisor";
import {useThesisContext} from "../../context/ThesisContext";
import {useAuthContext} from "../../context/AuthContext";
//todo - set thesis no with generate random number which has 7 digits..
//todo - fetch institutes after the university has selected.
function CreateThesis() {
    const { setThesisNoValue } =  useThesisContext();
    const{ user } = useAuthContext();
    const url = process.env.REACT_APP_GTS_URL;
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState({});
    const [universities, setUniversities] = useState([])
    const [institutes, setInstitutes] = useState([])
    const [languages, setLanguages] = useState([])
    const [isThesisSubmitted, setIsThesisSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        thesisNo: "",
        thesis_title: "",
        thesis_abstract: "",
        thesis_type: "",
        numberOfPages: 0,
        languageName: "",
        universityName:"",
        instituteName: "",
        authorName: "",
        authorLastname: "",
        coSupervisorName: "",
        coSupervisorLastname:"",
        thesisYear: "",
    });

    useEffect(() => {
        generateRnadomThesisNo();
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



    const handleChange = async (e) =>{
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value ? "": "This field cannot be null!"
        }));
        if(name === 'universityName' && value){
            try{
                const token = localStorage.getItem('access_token');
                const response = await fetch(`${url}/v1/institute/getAllInstitutesByUniversityName?universityName=${value}`,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });
                if(!response.ok){
                    throw new Error(`Failed to fetch institutes: ${response.statusText}`)
                }
                const data = await response.json();
                setInstitutes(data);
            }catch (e){
                console.log("errror fetching institutes, ", e);
            }
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = {};
        Object.entries(formData).forEach(([key, value]) => {
            if(value === null || value === ""){
                errors[key] = "This field cannot be null!!";
            }
        });
        setValidationErrors(errors);
        if(Object.keys(errors).length > 0){
            return;
        }

        try{
            const thesisResponse = await fetch(`${url}/v1/thesis/createThesis`,{
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            if(!thesisResponse.ok){
                const thesisError = await thesisResponse.text();
                console.log(formData)
                console.error("Server eRROR: ", thesisError);
                return;
            }

            const thesisData = await thesisResponse.json();
            console.log("Thesis created successfully: ", thesisData);

            setIsThesisSubmitted(true);
            setThesisNoValue(formData.thesisNo);
            navigate(`/create/addSupervisor/${formData.thesisNo}`);
        }catch (error){
            console.error("Error creating thesis: ", error);
        }
    }

    const generateRnadomThesisNo = () => {
        const randomThesisNo = Math.floor(1000000 + Math.random() * 9000000)
        setFormData((prevData) => ({
            ...prevData,
            thesisNo: randomThesisNo.toString(),
        }))
    }


    return (
        <div>
            <form className={"max-w-sm mx-auto"} onSubmit={handleSubmit}>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Author Name: </label>
                    <input
                        type={"text"}
                        name={"authorName"}
                        value={formData.authorName}
                        onChange={handleChange}
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"Enter your name"}
                    />
                    {validationErrors.authorName && (
                        <span className={"text-red-500"}>{validationErrors.authorName}</span>
                    )}
                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Author Lastname: </label>
                    <input
                        type={"text"}
                        name={"authorLastname"}
                        value={formData.authorLastname}
                        onChange={handleChange}
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"Enter your lastname"}
                    />
                    {validationErrors.authorLastname && (
                        <span className={"text-red-500"}>{validationErrors.authorLastname}</span>
                    )}
                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Thesis Title: </label>
                    <input
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        type={"text"}
                        name={"thesis_title"}
                        value={formData.thesis_title}
                        onChange={handleChange}
                        placeholder={"Enter Title"}
                    />
                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Thesis Type: </label>
                    <select
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        name={"thesis_type"}
                        value={formData.thesis_type}
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
                    {validationErrors.thesis_type && (
                        <span className={"text-red-500"}>{validationErrors.thesis_type}</span>
                    )}
                </div>

                <div className={"mb-5"}>
                    <label htmlFor={"large-input"} className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Thesis Abstract: </label>
                    <input
                        type={"text"}
                        name={"thesis_abstract"}
                        value={formData.thesis_abstract}
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
                        value={formData.universityName}
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
                    {validationErrors.universityName && (
                        <span className={"text-red-500"}>{validationErrors.universityName}</span>
                    )}
                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Institute: </label>
                    <select
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        name={"instituteName"}
                        value={formData.instituteName}
                        onChange={handleChange}
                        disabled={!formData.universityName}
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
                    {validationErrors.instituteName && (
                        <span className={"text-red-500"}>{validationErrors.instituteName}</span>
                    )}
                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Language: </label>
                    <select
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        name={"languageName"}
                        value={formData.languageName}
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
                    {validationErrors.languageName && (
                        <span className={"text-red-500"}>{validationErrors.languageName}</span>
                    )}
                </div>

                <div className={"mb-5"}>
                    <label className={" block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Number Of Pages: </label>
                    <input
                        className={"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        type={"number"}
                        name={"numberOfPages"}
                        value={formData.numberOfPages || ""}
                        onChange={handleChange}
                        placeholder={"Enter number of pages"}
                    />
                    {validationErrors.numberOfPages && (
                        <span className={"text-red-500"}>{validationErrors.numberOfPages}</span>
                    )}
                </div>


                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Co supervisor Name: </label>
                    <input
                        type={"text"}
                        name={"coSupervisorName"}
                        value={formData.coSupervisorName}
                        onChange={handleChange}
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"Enter your co-supervisor's name"}
                    />
                    {validationErrors.coSupervisorName && (
                        <span className={"text-red-500"}>{validationErrors.coSupervisorName}</span>
                    )}
                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Co supervisor Lastname: </label>
                    <input
                        type={"text"}
                        name={"coSupervisorLastname"}
                        value={formData.coSupervisorLastname}
                        onChange={handleChange}
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"Enter your co-supervisor's last name"}
                    />
                    {validationErrors.coSupervisorLastname && (
                        <span className={"text-red-500"}>{validationErrors.coSupervisorLastname}</span>
                    )}
                </div>

                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Thesis Year: </label>
                    <input
                        type={"datetime-local"}
                        name={"thesisYear"}
                        value={formData.thesisYear}
                        onChange={handleChange}
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={"YYYY-MM-DD"}
                    />
                </div>

                {!isThesisSubmitted && (
                    <button

                        type={"submit"}
                        className={"mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}>
                        SUBMIT THESIS
                    </button>
                )}
            </form>

            {isThesisSubmitted && (
                <CreateSupervisor/>
            )}
        </div>
    );
}

export default CreateThesis;
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useThesisContext} from "../../context/ThesisContext";

const ThesisSearchPage = () => {
    const url = process.env.REACT_APP_GTS_URL;
    const { setSearchResultsValue} = useThesisContext();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        title: '',
        year: '',
        type: '',
        language: '',
        university: '',
        author: '',
        institute: '',
    });

    const [universities, setUniversities] = useState([])
    const [institutes, setInstitutes] = useState([]);
    const [languages, setLanguages] = useState([])

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const universityResponse = await fetch(`${url}/v1/university/getAllUniversities`,)
                const universitiesData = await universityResponse.json();
                // console.log(universitiesData);
                setUniversities(universitiesData);
            } catch (e) {
                console.error("Error fetching universities: ", e);
            }
        };

        const fetchInstitutes = async () => {
            try {
                const instituteResponse = await fetch(`${url}/v1/institute/getAllInstitutes`,)
                const institutesData = await instituteResponse.json();
                setInstitutes(institutesData);
                // console.log(institutesData);

                // console.log(institutesData);
            } catch (error) {
                console.error("Error fetching institutes: ", error);
            }
        }

        const fetchLanguages = async () => {
            try{
                const languageResponse = await fetch(`${url}/v1/language/getAll`)
                const languagesData = await languageResponse.json();
                setLanguages(languagesData);
                // console.log(languageData);
            }catch (error){
                console.error("Error fetching languages: ", error);
            }
        }

        fetchLanguages();
        fetchUniversities();
        fetchInstitutes();
    } ,[]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const nonEmptySearchParams = Object.fromEntries(
            Object.entries(searchParams).filter(([key, value]) => value !== '')
        );

        if (nonEmptySearchParams.year) {
            const dateWithoutTime = new Date(nonEmptySearchParams.year);
            dateWithoutTime.setHours(0, 0, 0, 0);
            nonEmptySearchParams.year = dateWithoutTime.toISOString().split('T')[0];
        }

        const queryString = new URLSearchParams(nonEmptySearchParams).toString();
        const apiUrl = `${url}/v1/thesis/searchTheses?${queryString}`;

        console.log('API URL:', apiUrl);

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            console.log('Search Results:', data);
            setSearchResultsValue(data);

            navigate('/thesisFilterResults');
        } catch (error) {
            console.error('Error searching theses:', error);
        }
    };

    const uniqueInst = Array.from(new Set(institutes.map(institute => institute.name)));
    return (
        <form>
            <div className={"grid gap-6 mb-6 md:grid-cols-2"}>
                <div>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Title:</label>
                    <input className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                           type="text"
                           name="title"
                           value={searchParams.title}
                           onChange={handleInputChange}
                           placeholder={"Title"}/>
                </div>
                <div>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Year:</label>
                    <input className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                           type={"date"}
                           name="year"
                           value={searchParams.year}
                           onChange={handleInputChange}
                           placeholder={"YYYY-MM-DD"}
                    />
                </div>
                <div>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Type:</label>
                    <input className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                           type="text"
                           name="type"
                           value={searchParams.type}
                           onChange={handleInputChange}
                           placeholder={"Type"}/>
                </div>
                <div className={"mb-5"}>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Language: </label>
                    <select
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        name={"language"}
                        value={searchParams.language}
                        onChange={handleInputChange}

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


                <div>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Author Name and Surname:</label>
                    <input className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                           type="text"
                           name="author"
                           value={searchParams.author}
                           onChange={handleInputChange}
                           placeholder={"Author"}/>
                </div>
                <div>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>University Name:</label>
                    <select
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        name="university"
                        value={searchParams.university}
                        onChange={handleInputChange}
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
                <div>
                    <label className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Institute:</label>
                    <select
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        name="institute"
                        value={searchParams.institute}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>
                            Select Institute
                        </option>
                        {uniqueInst.map((institutename) => (
                            <option key={institutename} value={institutename}>
                                {institutename}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                            onClick={handleSearch}>Search</button>
                </div>
            </div>
        </form>
    );
};

export default ThesisSearchPage;

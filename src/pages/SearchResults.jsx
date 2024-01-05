import React from 'react';
import {useThesisContext} from "../context/ThesisContext";
import {Link} from "react-router-dom";

const SearchResultsPage = () => {
    const {searchResults} = useThesisContext();
    const totalResults = searchResults.length;
    return (
        <div>
            <div className={"flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"} role={"alert"}>
                <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Thesis Results:</span>
                    <ul className="mt-1.5 list-disc list-inside">
                        <li>If you want to see thesis details, please click the thesis number.</li>
                    </ul>
                </div>
            </div>
            <p>{`Found ${totalResults} result${totalResults !== 1 ? 's' : ''}.`}</p>
            <table className={"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"}>
                <thead className={"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"}>
                <tr>
                    <th scope={"col"} className={"px-6 py-3"}>Thesis No</th>
                    <th scope={"col"} className={"px-6 py-3"}>Author</th>
                    <th scope={"col"} className={"px-6 py-3"}>Year</th>
                    <th scope={"col"} className={"px-6 py-3"}>Thesis Title</th>
                    <th scope={"col"} className={"px-6 py-3"}>Type</th>
                    <th scope={"col"} className={"px-6 py-3"}>Language</th>
                    <th scope={"col"} className={"px-6 py-3"}>University</th>
                    <th scope={"col"} className={"px-6 py-3"}>Institute</th>
                </tr>
                </thead>
                <tbody>
                {searchResults.map((thesis) => (

                    <tr className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700"} key={thesis.id}>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Link to={`/fullThesisDetails/${thesis.thesisNo}`}>
                                {thesis.thesisNo}
                            </Link>
                        </td>
                        <td className={"px-6 py-4"} >{`${thesis.author.name} ${thesis.author.lastname}`}</td>
                        <td className={"px-6 py-4"} >{new Date(thesis.thesisYear).getFullYear()}</td>
                        <td className={"px-6 py-4"} >{thesis.thesis_title}</td>
                        <td className={"px-6 py-4"} >{thesis.thesis_type}</td>
                        <td className={"px-6 py-4"} >{thesis.language.name}</td>
                        <td className={"px-6 py-4"} >{thesis.university.name}</td>
                        <td className={"px-6 py-4"} >{thesis.institute.name}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchResultsPage;
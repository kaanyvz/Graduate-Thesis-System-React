import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useThesisContext} from "../../context/ThesisContext";
import Spinner from "../layout/Spinner";

function FullThesisDetails() {
    const { thesisNo } = useParams();
    const { thesisDetails, fetchThesisDetails } = useThesisContext();

    useEffect(() => {
        fetchThesisDetails(thesisNo);
    }, [fetchThesisDetails, thesisNo]);
    // console.log("Thesis Details:", thesisDetails);
    if(!thesisDetails){
        return <Spinner/>;
    }

    return (
        <>

            <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                {thesisDetails.thesis_title}
            </h1>
            <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-1 mb-8">

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Author Information</h2>
                        <p className="mb-2">{`Author: ${thesisDetails?.author?.name} ${thesisDetails?.author?.lastname}`}</p>
                        <p>{`Email: ${thesisDetails?.author?.mail}`}</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Supervisor Information</h2>
                        {thesisDetails?.supervisors && thesisDetails?.supervisors.length > 0 && (
                            <div>
                                <p className="mb-2">{`Supervisor: ${thesisDetails.supervisors[0].name} ${thesisDetails.supervisors[0].lastname}`}</p>
                            </div>
                        )}
                        {thesisDetails?.coSupervisor && (
                            <p>{`Co-Supervisor: ${thesisDetails.coSupervisor.name} ${thesisDetails.coSupervisor.lastname}`}</p>
                        )}
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Thesis Information</h2>
                        <p>{`Type: ${thesisDetails?.thesis_type}`}</p>
                        <p>{`Language: ${thesisDetails?.language?.name}`}</p>
                        <p>{`University: ${thesisDetails?.university?.name}`}</p>
                        <p>{`Institute: ${thesisDetails?.institute?.name}`}</p>
                        <p>{`Submission Date: ${new Date(thesisDetails?.submissionDate).toLocaleString()}`}</p>
                        <p>{`Thesis Year: ${new Date(thesisDetails?.thesisYear).getFullYear()}`}</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Keywords</h2>
                        <ul className="list-disc list-inside">
                            {thesisDetails?.keywords?.map((keyword) => (
                                <li key={keyword?.id}>{keyword?.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Subject Topics</h2>
                        <ul className="list-disc list-inside">
                            {thesisDetails?.subjectTopics?.map((subject) => (
                                <li key={subject?.id}>{subject?.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="md:col-span-1 mb-8">
                    <h2 className="text-2xl font-bold mb-2">Abstract</h2>
                    <p>{thesisDetails.thesis_abstract}</p>
                </div>
            </div>
        </>
    );
}

export default FullThesisDetails;
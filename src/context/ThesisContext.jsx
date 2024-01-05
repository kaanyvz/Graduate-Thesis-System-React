import {createContext, useContext, useState} from 'react';
import {useAuthContext} from "./AuthContext";

const ThesisContext = createContext();

export const useThesisContext = () => {
    return useContext(ThesisContext);
};

export const ThesisProvider = ({ children }) => {
    const {user} = useAuthContext();
    const url = process.env.REACT_APP_GTS_URL;
    const [thesisNo, setThesisNo] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [thesisDetails, setThesisDetails] = useState({});

    const setThesisNoValue = (value) => {
        setThesisNo(value);
    };

    const setSearchResultsValue = (results) => {
        setSearchResults(results);
    }

    const fetchThesisDetails = async (thesisNo) => {
        try {
            const response = await fetch(`${url}/v1/thesis/findByThesisNo?thesisNo=${thesisNo}`);
            const data = await response.json();
            // console.log(data);
            setThesisDetails(data);
        } catch (e) {
            console.error("Error fetching thesis details..", e);
        }
    };

    return (
        <ThesisContext.Provider
            value={{
                thesisNo,
                setThesisNoValue,
                searchResults,
                setSearchResultsValue,
                thesisDetails,
                fetchThesisDetails}}>
            {children}
        </ThesisContext.Provider>
    );
};

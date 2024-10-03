import { useState, useEffect } from "react";
import axios from "axios";

export const FindByAll = (url) => {
    const [response, setResponse] = useState({});
    const [error, setError] = useState(null);
    const getData = async url => {
        try {
            setResponse(await axios.get(url));
        }
        catch (error) { setError(error)}
    }
    useEffect(() => {
        getData(url);
    }, [url]);
    return [response, error];
}
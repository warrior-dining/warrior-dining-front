import { useState, useEffect } from "react";
import axios from "axios";

export const FindByAll = (baseUrl, page = 0, size = 10) => {
    const [response, setResponse] = useState({});
    const [error, setError] = useState(null);
    const getData = async url => {
        try {
            setResponse(await axios.get(url));
        }
        catch (error) { setError(error)}
    }
    useEffect(() => {
        const url = `${baseUrl}?page=${page}&size=${size}`;
        getData(url);
    }, [baseUrl, page, size]);
    return [response, error];
}

export const FindById = (url) => {
    const [response, setResponse] = useState({});
    const [error, setError] = useState(null);
    const getData = async url => {
        try {
            setResponse(await axios.get(url));
        } catch (error) {
            setError(error)
        }
    }
    useEffect(() => {
        getData(url);
    }, [url]);
    return [response, error];
}
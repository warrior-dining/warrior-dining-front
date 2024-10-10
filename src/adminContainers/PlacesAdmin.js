import '../css/restaurantManagement.css';
import {useNavigate} from "react-router-dom";
import {FindByAll} from "../api/DataApi";
import React, {useEffect, useState} from "react";
import axios from "axios";

const host = "http://localhost:8080/api/admin/places/";

const PlaceList = ({list}) => {
    const navigate = useNavigate();

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>No</th>
                    <th>음식점 이름</th>
                    <th>위치</th>
                    <th>전화번호</th>
                    <th>등록일</th>
                </tr>
                </thead>
                <tbody>
                {
                    list.map((row,index) => (
                        <tr key={index} onClick={() => {
                            navigate("/admin/places/info/"+ row.id)
                        }}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.addressNew}</td>
                            <td>{row.phone}</td>
                            <td>{row.createdAt}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    );
}

const PlacesAdmin = () => {
    const navigate = useNavigate();
    const [searchType, setSearchType] = useState('name');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [list, setList] = useState([])
    const [response, setResponse] = useState({});
    const [error, setError] = useState(null);

    // 검색어가 있을 때는 FindByKeyword, 없을 때는 FindByAll 사용
    useEffect(() => {
        const fetchData = async () => {
            const url = `${host}?page=${page}&size=${pageSize}`;
            try {
                const result = await axios.get(url);
                setResponse(result);
                setList(result.data.status ? result.data.results.content : []);
                setTotalPages(result.data.status ? result.data.results.totalPages : 0);
            } catch (error) {
                setError(error);
                console.log(error);
            }
        };
        fetchData();
    }, [page, pageSize]);

    const searchEvent = async () => {
        if(searchKeyword === null) {
            alert("검색어를 입력하세요.");
            return;
        }

        setPage(0); // 검색할 때 페이지를 0으로 초기화
        const url = `${host}?type=${searchType}&keyword=${searchKeyword}&page=${0}&size=${pageSize}`
        try {
            const result = await axios.get(url);
            setResponse(result);
            setList(result.data.status ? result.data.results.content : []);
            setTotalPages(result.data.status ? result.data.results.totalPages : 0);
        } catch (error) {
            setError(error);
            console.log(error);
        }
    };

    const getPaginationNumbers = () => {
        const maxPagesToShow = 5;
        const startPage = Math.max(0, page - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow);

        return Array.from({ length: endPage - startPage }, (_, index) => startPage + index);
    };

    const paginationNumbers = getPaginationNumbers();

    return (
        <>
            <main>
                <div className="container">

                    <h2 className="main-title">음식점 목록</h2>

                    <div className="header-container">
                        <button type="button" onClick={()=>{
                            navigate('/admin/places/add');
                        }}>음식점 등록</button>
                        <div className="search-bar">
                            <select value={searchType} onChange={(e)=> {setSearchType(e.target.value)}}>
                                <option value="name">음식점 이름</option>
                                <option value="location">위치</option>
                            </select>
                            <input type="text" placeholder="검색어 입력..." value={searchKeyword} onChange={(e)=> {setSearchKeyword(e.target.value)}}/>
                            <button onClick={searchEvent} >검색</button>
                        </div>
                    </div>
                    <PlaceList  list={list}/>
                    <div className="pagination">
                        {page >= 1 && (
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page - 1);
                                }}
                            >
                                이전
                            </a>
                        )}
                        {paginationNumbers.map((num) => (
                            <a
                                key={num}
                                href="#"
                                className={num === page ? "active" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(num);
                                }}
                            >
                                {num + 1}
                            </a>
                        ))}
                        {page < totalPages - 1 && (
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                다음
                            </a>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

export default PlacesAdmin;

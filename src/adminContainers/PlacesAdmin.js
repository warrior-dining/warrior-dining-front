import '../css/restaurantManagement.css';
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import axiosInstance from '../context/AxiosInstance';
import { urlList, useAuth, refreshToken } from '../context/AuthContext';


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
    const [error, setError] = useState(null);
    const searchKeywordRef= useRef();
    const {reissueToken} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            await axiosInstance.get(`/api/admin/places/?type=${searchType}&keyword=${searchKeyword}&page=${page}&size=${pageSize}`)
            .then(res => {
                refreshToken(res.data, reissueToken);
                setList(res.data.status ? res.data.results.content : []);
                setTotalPages(res.data.status ? res.data.results.totalPages : 0);
            })
            .catch (error => setError(error) );
            }
            fetchData();
        }, [page, pageSize, searchKeyword]);

    const searchEvent = (e) => {
        e.preventDefault();
        if(searchKeyword === null) {
            alert("검색어를 입력하세요.");
            return;
        }
        setPage(0);
        setSearchKeyword(searchKeywordRef.current.value);
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
                        <form onSubmit={searchEvent}>
                            <div className="search-bar">
                                <select value={searchType} onChange={(e)=> {setSearchType(e.target.value)}}>
                                    <option value="name">음식점 이름</option>
                                    <option value="location">위치</option>
                                </select>
                                <input type="text" placeholder="검색어 입력..." ref={searchKeywordRef}/>
                                <button type="submit" >검색</button>
                            </div>
                        </form>
                    </div>
                    <PlaceList  list={list}/>
                    <div className="pagination">
                            <a href="#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   if(page > 0){
                                       setPage(page - 1);
                                   }
                               }}
                               disabled={page === 0} > 이전 </a>
                        {paginationNumbers.map((num) => (
                            <a key={num} href="#" className={num === page ? "active" : ""}
                               onClick={(e) => {
                                   e.preventDefault();
                                   setPage(num);
                               }}> {num + 1} </a>
                        ))}
                            <a href="#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   if(page < totalPages-1){
                                       setPage(page + 1);
                                   }
                                }}
                                disabled={page >= totalPages - 1}> 다음 </a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default PlacesAdmin;

import '../css/restaurantManagement.css';
import {useNavigate} from "react-router-dom";
import {FindByAll} from "../api/DataApi";
import React, {useEffect, useState} from "react";

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
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [list, setList] = useState([])
    const [response, error] = FindByAll(host, page, pageSize); // 만들어 놓은 api Hook 사용.
    const navigate = useNavigate();

    useEffect(() => {
        if(error) {
            console.log(error);
        }
        if(response.data) {
            setList(response.data.status ? response.data.results.content : []);
            setTotalPages(response.data.status ? response.data.results.totalPages : [])
        }
    }, [response,error]);


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
                            <select>
                                <option value="name">음식점 이름</option>
                                <option value="location">위치</option>
                            </select>
                            <input type="text" placeholder="검색어 입력..."/>
                            <button>검색</button>
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

import React, {useEffect, useState} from "react";
import '../css/default.css';
import '../css/mypageMutual.css';
import '../css/myPageBookmark.css';
import MypageSidebar from "../components/MypageSidebar";
import {useAuth} from "../context/AuthContext";
import axios from "axios";

const host = "http://localhost:8080/api/member/bookmarks/"

const MypageBookmark = () => {
    const {sub} = useAuth('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if(sub){
            const fetchData = () =>{
                let url = `${host}?email=${sub}&page=${page}&size=${pageSize}`;
                axios.get(url)
                    .then(res => {
                        setData(res.data.results ? res.data.results.content : []);
                        setTotalPages( res.data.status ? res.data.results.totalPages : 0);
                    })
                    .catch(error => console.log(error));
            }
            fetchData();
        }
    }, [page, pageSize, reload]);

    const removeBookmark = (placeId) => {
        let url = `${host}?email=${sub}&placeId=${placeId}`;
        axios.delete(url)
            .then(res => {
                alert(`즐겨찾기가 해제되었습니다.`);
                setReload(!reload);
            })
            .catch(error => console.log(error));
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
        <main className="mypage-container">
            <MypageSidebar />
            <div className="bookmark-content">
                <h1>즐겨찾기</h1>
                <div className="favorite-list">
                    {data.map((row) => (
                        <div className="favorite-item" key={row.placeId}>
                            <h2>{row.placeName}</h2>
                            <p>위치: {row.addressNew}</p>
                            <p>평점: {row.avgRating}</p>
                            <p>전화: {row.phone}</p>
                            <button className="remove-favorite-button"
                                onClick={() => removeBookmark(row.placeId)}> 즐겨찾기 해제
                            </button>
                        </div>
                    ))}
                </div>
                <div className="bookmark-pagination-container">
                    <div className="bookmark-pagination">
                        <a href="#"
                           onClick={(e) => {
                               e.preventDefault();
                               if (page > 0) {
                                   setPage(page - 1);
                               }
                           }}
                           disabled={page === 0}> 이전 </a>
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
                               if (page < totalPages - 1) {
                                   setPage(page + 1);
                               }
                           }}
                           disabled={page >= totalPages - 1}> 다음 </a>
                    </div>
                </div>
            </div>
        </main>
    </>
);
}

export default MypageBookmark

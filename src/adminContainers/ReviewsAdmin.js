import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import '../css/reviewsAdmin.css';
import { refreshToken, useAuth } from '../context/AuthContext';
import axiosInstance from '../context/AxiosInstance';


const ReviewList = ({data, setData}) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const {reissueToken} = useAuth();
    

    const handleRowClick = (id) => {
        setExpandedRowIds((prev) =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const getStars = (rating) => {
        const starCount = parseInt(rating, 10); // 평점을 정수로 변환
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < starCount ? '★' : '☆'; // 평점에 따라 채워진 별과 빈 별을 생성
        }
        return stars;
    };

    const truncateContent = (content) => {
        if (content.length > 5) {
            return content.slice(0, 5) + '...'; // 5글자 이상이면 잘라내고 ... 
        }
        return content;
    };

    const handleUpdateStatus = (id) => {
        setData(prevData => prevData.map(item =>
            item.id === id ? {...item, isDeleted: true} : item
        ));
        axiosInstance.patch(`/api/admin/reviews/${id}`) // 상태 업데이트를 위한 요청
            .then(res => {
                refreshToken(res.data, reissueToken);
                window.location.reload();
            })
            .catch(error => {
                console.log('Axios error:', error);
                if (error.response) {
                    console.log('Response data:', error.response.data);
                    console.log('Response status:', error.response.status);
                    console.log('Response headers:', error.response.headers);
                }
            });
    };

    return (
        <>
            <table className="review-table">
                <thead>
                <tr>
                    <th>리뷰 ID</th>
                    <th>사용자 이름</th>
                    <th>음식점명</th>
                    <th>평점</th>
                    <th>리뷰 내용</th>
                    <th>리뷰 날짜</th>
                    <th>상태</th>
                    <th>작업</th>
                </tr>
                </thead>
                <tbody>
                {data.length === 0 ? (
                    <tr></tr>
                ) : (
                    data.map((row) => (
                        <React.Fragment key={row.id}>
                            <tr onClick={() => handleRowClick(row.id)}>
                                <td>{row.id}</td>
                                <td>{row.user.name}</td>
                                <td>{row.place.name}</td>
                                <td>{getStars(row.rating)}</td>
                                <td>{truncateContent(row.content)}</td>
                                <td>{row.createdAt}</td>
                                <td>{row.deleted ? '비활성화' : '활성화'}</td>
                                <td className="actions">
                                    {row.status === '0' ? '1' : (
                                            <button className="delete"
                                                    style={{display: row.deleted ? 'none' : ''}}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); //tr 태그의 온클릭 이벤트 비활성화.
                                                        handleUpdateStatus(row.id)
                                                    }}>삭제</button>
                                    )}
                            </td>
                        </tr>
                        {expandedRowIds.includes(row.id) && (
                            <tr className="review-detail">
                                <td colSpan="7">
                                    <div className="detail-header">상세 내용:</div>
                                    <p>{row.content}</p>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))
            )}
                </tbody>
            </table>
        </>
    );
};

const ReviewsAdmin = () => {
    const [data, setData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchType, setSearchType] = useState('user');
    const searchKeywordRef = useRef();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sortType, setSortType] = useState('');
    const {reissueToken} = useAuth();

    
    useEffect(() => {
        const fetchData = async () => {
            axiosInstance.get(`/api/admin/reviews/?searchtype=${searchType}&searchkeyword=${searchKeyword}&page=${page}&size=${pageSize}&sorttype=${sortType}`)
            .then(res => {
                refreshToken(res.data, reissueToken);
                setData(res.data.status ? res.data.results.content : []);
                setTotalPages(res.data.status ? res.data.results.totalPages : 0);
                })
                .catch(error => console.log(error));
        }
        fetchData();
    }, [ page, pageSize, searchKeyword, sortType ]);

    const searchEvent = (e) => {
        e.preventDefault();
        if(searchKeyword === null) {
            alert("검색어를 입력하세요.");
            return;
        }
        setPage(0); // 검색할 때 페이지를 0으로 초기화
        setSortType('');
        setSearchKeyword(searchKeywordRef.current.value);
    };

    const getPaginationNumbers = () => {
        const maxPagesToShow = 5; // 화면에 보여줄 페이지 갯수
        const startPage = Math.max(0, page - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow);
        return Array.from({ length: endPage - startPage }, (_, index) => startPage + index);
    };
    const paginationNumbers = getPaginationNumbers();

    return (
        <>
            <main>
                <div className="review-container">
                    <h2 className="main-title">사용자 리뷰 전체 목록</h2>
                    <div className="admin-filter-search-container">
                        <div className="admin-filter-bar">
                            <select value={sortType} onChange={(e) => { setSortType(e.target.value) }}>
                                <option>평점</option>
                                <option value="1">★</option>
                                <option value="2">★★</option>
                                <option value="3">★★★</option>
                                <option value="4">★★★★</option>
                                <option value="5">★★★★★</option>
                            </select>
                            <select value={sortType} onChange={(e) => { setSortType(e.target.value) }}>
                                <option>상태</option>
                                <option value="true">비활성화</option>
                                <option value="false">활성화</option>
                            </select>
                            <select value={sortType} onChange={(e) => { setSortType(e.target.value) }}>
                                <option>정렬 기준</option>
                                <option value="desc">최신순</option>
                                <option value="asc">오래된 순</option>
                            </select>
                        </div>
                        <form onSubmit={searchEvent}>
                            <div className="admin-search-bar">
                                <select value={searchType} onChange={(e) => { setSearchType(e.target.value) }}>
                                    <option value="user">사용자 이름</option>
                                    <option value="place">음식점명</option>
                                    <option value="content">리뷰 내용</option>
                                </select>
                                <input type="text" placeholder="리뷰 검색" ref={searchKeywordRef}/>
                                <button type="submit">검색</button>
                            </div>
                        </form>
                    </div>
                    <ReviewList data={data} setData={setData} />
                </div>
                <div className="review-pagination">
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
            </main>
        </>
    );
};

export default ReviewsAdmin;

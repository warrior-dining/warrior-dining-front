import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/reviewsAdmin.css';

const host = "http://localhost:8080/api/admin/reviews/";

const ReviewList = () => {
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(host)
      .then(res => {
        console.log(res);
        setData(res.data.data);
      })
      .catch(error => console.log(error));
  }, []);

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <div>Loading...</div>; // 데이터가 로드되기 전까지 로딩 메시지 표시
  }

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
      return content.slice(0, 5) + '...'; // 5글자 이상이면 잘라내고 ... 추가
    }
    return content;
  };

  const handleUpdateStatus = (id) => {
    setData(prevData => prevData.map(item => 
      item.id === id ? { ...item, isDeleted: true } : item
    ));

    axios.patch(`${host}/${id}`, { status: 1 }) // 상태 업데이트를 위한 요청
        .then(res => {
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
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => handleRowClick(row.id)}>
                <td>{row.id}</td>
                <td>{row.user.name}</td>
                <td>{row.place.name}</td>
                <td>{getStars(row.rating)}</td>
                <td>{truncateContent(row.content)}</td>
                <td>{row.createdAt}</td>
                <td className="actions">
                  {row.status === '0' ? '' : (
                    row.deleted ? 
                    '' :
                      <button className="delete"  onClick={() => handleUpdateStatus(row.id, { status: 1 })}>삭제</button>
                      
                    
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
          ))}
        </tbody>
      </table>
    </>
  );
};

const ReviewsAdmin = () => {
  return (
    <>
      <main>
        <div className="container">
          <h2 className="main-title">사용자 리뷰 전체 목록</h2>

          <div className="filter-bar">
            <select>
              <option>날짜</option>
              <option>2024-08-25</option>
              <option>2024-08-24</option>
            </select>
            <select>
              <option>평점</option>
              <option>★★★</option>
              <option>★★★★</option>
            </select>
            <select>
              <option>상태</option>
              <option>승인 대기</option>
              <option>승인됨</option>
              <option>삭제됨</option>
            </select>
            <select>
              <option>정렬 기준</option>
              <option>최신순</option>
              <option>오래된 순</option>
              <option>평점 높은 순</option>
            </select>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="리뷰 검색" />
            <button>검색</button>
          </div>
          <ReviewList />
        </div>
      </main>
    </>
  );
};

export default ReviewsAdmin;

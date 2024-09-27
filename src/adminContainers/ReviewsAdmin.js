import React from 'react';
import { useEffect, useState } from 'react';
import '../css/reviewsAdmin.css'


const data = [
    {
      id: 1,
      username: '홍길동',
      placename: '강남불백 신촌점',
      rating: '★★★★',
      content: '음식이 맛있어요.',
      detail: '음식이 정말 맛있었고, 분위기도 좋았습니다. 다음에 또 방문할게요.',
      createAt: '2024-08-25',
      status: '0'
    },
    {
      id: 2,
      username: '김철수',
      placename: '한창희천하일면 신촌점',
      rating: '★★★',
      content: '서비스가 느렸어요.',
      detail: '두번 다시 안간다.',
      createAt: '2024-08-24',
      status: '0'
    }
]

const ReviewList = () => {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const handleRowClick = (id) => {
      setExpandedRowId(expandedRowId === id ? null : id);
  };

  useEffect(() => {

  }, []);
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
            {
              data.map((row, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={() => handleRowClick(row.id)}>
                      <td>{row.id}</td>
                      <td>{row.username}</td>
                      <td>{row.placename}</td>
                      <td>{row.rating}</td>
                      <td>{row.content}</td>
                      <td>{row.createAt}</td>
                      <td className="actions">
                        {row.status === '0' ? <button className="delete">삭제</button> : ''}
                      </td>
                    </tr>
                    {expandedRowId === row.id && (
                        <tr className="review-detail">
                          <td colSpan="7">
                            <div className="detail-header">상세 내용:</div>
                            <p>{row.detail}</p>
                          </td>
                        </tr>
                    )}
                  </React.Fragment>
              ))
            }
            </tbody>
          </table>
        </>
    );
  }

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
              <input type="text" placeholder="리뷰 검색"/>
              <button>검색</button>
            </div>
            <ReviewList />
          </div>
        </main>
      </>
  );
}

export default ReviewsAdmin;

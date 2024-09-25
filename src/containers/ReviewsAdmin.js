import React from 'react';
import { useEffect, useState } from 'react';

const ReviewsAdmin = () => {
  // 상세 보기 상태를 관리하기 위한 상태 변수
  const [expandedRowId, setExpandedRowId] = useState(null);

  // 클릭 시 호출되는 함수
  const handleRowClick = (id) => {
    // 현재 클릭한 행이 이미 확장되어 있다면 축소, 아니면 확장
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  // 컴포넌트가 마운트될 때 초기화 작업을 수행
  useEffect(() => {
    // 필요한 경우 추가적인 초기화 작업을 여기에 작성

    return () => {
      // 클린업 작업이 필요한 경우 여기에 작성
    };
  }, []); // 빈 배열로 인해 컴포넌트가 처음 마운트될 때만 실행

  return (
    <>
      <main>
        <div className="container">
          <h2>사용자 리뷰 전체 목록</h2>
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
              <tr data-id="1" onClick={() => handleRowClick('1')}>
                <td>001</td>
                <td>홍길동</td>
                <td>새마을식당</td>
                <td>★★★★</td>
                <td>음식이 맛있어요.</td>
                <td>2024-08-25</td>
                <td className="actions">
                  <button className="delete">삭제</button>
                </td>
              </tr>
              {expandedRowId === '1' && (
                <tr className="review-detail">
                  <td colSpan="7">
                    <div className="detail-header">상세 내용</div>
                    <p><strong>리뷰 내용:</strong> 음식이 정말 맛있었고, 분위기도 좋았습니다. 다음에 또 방문할게요.</p>
                  </td>
                </tr>
              )}
              <tr data-id="2" onClick={() => handleRowClick('2')}>
                <td>002</td>
                <td>김철수</td>
                <td>새마을식당2</td>
                <td>★★★</td>
                <td>서비스가 느렸어요.</td>
                <td>2024-08-24</td>
                <td className="actions">
                  <button className="delete">삭제</button>
                </td>
              </tr>
              {expandedRowId === '2' && (
                <tr className="review-detail">
                  <td colSpan="7">
                    <div className="detail-header">상세 내용</div>
                    <p><strong>리뷰 내용:</strong> 서비스가 좀 느렸지만, 음식은 괜찮았습니다.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default ReviewsAdmin;

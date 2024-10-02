import React from "react";
import '../css/default.css';
import '../css/mypageMutual.css';
import '../css/myPageBookmark.css';
import MypageSidebar from "../components/MypageSidebar";


const MypageBookmark = () => {
    const favorites = [
        {
            name: "레스토랑 A",
            location: "서울시 강남구",
            rating: "★★★★☆ (4.5)",
            phone: "02-1234-5678"
        },
        {
            name: "레스토랑 B",
            location: "서울시 홍대",
            rating: "★★★☆☆ (3.8)",
            phone: "02-2345-6789"
        },
        {
            name: "레스토랑 C",
            location: "서울시 신촌",
            rating: "★★★★★ (5.0)",
            phone: "02-3456-7890"
        }
    ];

    const removeFavorite = (name) => {
        // 즐겨찾기 해제 로직 구현
        alert(`${name} 즐겨찾기가 해제되었습니다.`);
        console.log(`${name} 즐겨찾기 해제됨.`);
    };


return (
    <>
 <main className="mypage-container">
            <MypageSidebar />
            <div className="bookmark-content">
                <h1>즐겨찾기</h1>
                <div className="favorite-list">
                    {favorites.map((restaurant, index) => (
                        <div className="favorite-item" key={index}>
                            <h2>{restaurant.name}</h2>
                            <p>위치: {restaurant.location}</p>
                            <p>평점: {restaurant.rating}</p>
                            <p>전화: {restaurant.phone}</p>
                            <button 
                                className="remove-favorite-button" 
                                onClick={() => removeFavorite(restaurant.name)}
                            >
                                즐겨찾기 해제
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    </>
);
}

export default MypageBookmark

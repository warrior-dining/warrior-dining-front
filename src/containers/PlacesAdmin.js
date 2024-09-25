const PlacesAdmin = () => {
    return (
        <>
            <main>
                <div className="container">
                    <h2>음식점 목록</h2>
                    <div className="header-container">
                        <button type="button">음식점 등록</button>
                        <div className="search-bar">
                            <select>
                                <option value="name">음식점 이름</option>
                                <option value="location">위치</option>
                            </select>
                            <input type="text" placeholder="검색어 입력..."/>
                            <button>검색</button>
                        </div>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>음식점 ID</th>
                            <th>음식점 이름</th>
                            <th>위치</th>
                            <th>전화번호</th>
                            <th>등록일</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>001</td>
                            <td>맛있는 집</td>
                            <td>서울시 강남구</td>
                            <td>010-1234-5678</td>
                            <td>2024-01-15</td>
                        </tr>
                        <tr>
                            <td>002</td>
                            <td>행복한 식당</td>
                            <td>서울시 종로구</td>
                            <td>010-8765-4321</td>
                            <td>2024-02-20</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="pagination">
                        <a href="#" className="active">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">다음</a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default PlacesAdmin;
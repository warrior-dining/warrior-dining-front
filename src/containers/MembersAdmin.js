const MembersAdmin = () => {
    return (
        <>
            <main>
                <div className="container">
                    <h2>회원 목록</h2>
                    <div className="search-bar">
                        <select>
                            <option value="id">회원 ID</option>
                            <option value="name">이름</option>
                            <option value="email">권한</option>
                        </select>
                        <input type="text" placeholder="검색어 입력..."/>
                        <button>검색</button>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>회원 ID</th>
                            <th>이름</th>
                            <th>가입일</th>
                            <th>권한</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr onClick="location.href='#'">
                            <td>1</td>
                            <td>hong@example.com</td>
                            <td>홍길동</td>
                            <td>2024-01-15</td>
                            <td>관리자</td>
                        </tr>
                        <tr onClick="location.href='#'">
                            <td>2</td>
                            <td>kim@example.com</td>
                            <td>김철수</td>
                            <td>2024-02-20</td>
                            <td>사용자, 오너</td>
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

export default MembersAdmin;
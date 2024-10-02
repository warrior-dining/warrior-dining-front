import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../css/default.css';
import '../css/myPageDelete.css';


const MypageDelete = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!password) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
  
      if (window.confirm('정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        try {
          const response = await fetch('delete_account_processing', {
            method: 'POST',
            body: new URLSearchParams({ password }),
            headers: {
              'Accept': 'application/json',
            },
          });
  
          if (response.ok) {
            alert('회원 탈퇴가 완료되었습니다.');
            navigate('/'); 
          } else {
            alert('회원 탈퇴 처리에 실패했습니다. 다시 시도해 주세요.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
        }
      }
    };

    return (
        <>
         <main className="mypage-container">
            <div className="mypagedelete-container">
            <section id="delete-account">
            <h1>회원 탈퇴</h1>
            <div className="confirmation-section">
                <p className="confirmation-message">
                회원 탈퇴를 하시려면 비밀번호를 입력한 후, 아래 버튼을 클릭하세요. 이 작업은 되돌릴 수 없습니다.
                </p>
                <form onSubmit={handleSubmit}>
                <label htmlFor="password">비밀번호 확인</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="large-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="confirmation-buttons">
                    <button type="submit" className="delete-button">회원 탈퇴</button>
                    <button type="button" onClick={() => navigate('/mypage/edit')}>취소</button>
                </div>
                </form>
            </div>
            </section>
            </div>
         </main>
        </>
    )
}
export default MypageDelete;

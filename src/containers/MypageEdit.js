import React, {useState} from "react";
import '../css/mypageMutual.css';
import '../css/default.css';
import '../css/myPageEdit.css';
import MypageSidebar from "../components/MypageSidebar";
import { Link } from "react-router-dom";

const MypageEdit = () => {
    const [username, setUsername] = useState('홍길동');
    const [email, setEmail] = useState('hong@example.com');
    const [phone, setPhone] = useState('010-1234-5678');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        alert('변경 사항이 저장되었습니다.');
        console.log({ username, email, phone });
      };
    
      const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
          alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
        } else {
          alert('비밀번호가 변경되었습니다.');
          console.log({ currentPassword, newPassword });
        }
      };
    
      const handleNotificationsSubmit = (e) => {
        e.preventDefault();
        alert('알림 설정이 저장되었습니다.');
        console.log({ emailNotifications, smsNotifications, pushNotifications });
      };

    return (
        <>
         <main className="mypage-container">
         <MypageSidebar />
         <div className="content">
        <section id="settings">
          <h1>설정</h1>

          {/* 프로필 수정 */}
          <div className="settings-section">
            <h2>프로필 수정</h2>
            <form onSubmit={handleProfileSubmit}>
              <label htmlFor="username">사용자 이름</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="phone">전화번호</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <button type="submit" className="save-button">저장</button>
            </form>
          </div>

          {/* 비밀번호 변경 */}
          <div className="settings-section">
            <h2>비밀번호 변경</h2>
            <form onSubmit={handlePasswordSubmit}>
              <label htmlFor="current-password">현재 비밀번호</label>
              <input
                type="password"
                id="current-password"
                name="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />

              <label htmlFor="new-password">새 비밀번호</label>
              <input
                type="password"
                id="new-password"
                name="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <label htmlFor="confirm-password">새 비밀번호 확인</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button type="submit" className="save-button">변경</button>
            </form>
          </div>

          {/* 알림 설정 */}
          <div className="settings-section">
            <h2>알림 설정</h2>
            <form onSubmit={handleNotificationsSubmit}>
              <label>
                <input
                  type="checkbox"
                  name="email-notifications"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                이메일 알림 받기
              </label>
              <label>
                <input
                  type="checkbox"
                  name="sms-notifications"
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                />
                SMS 알림 받기
              </label>
              <label>
                <input
                  type="checkbox"
                  name="push-notifications"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                />
                푸시 알림 받기
              </label>

              <button type="submit" className="save-button">저장</button>
            </form>
          </div>

          {/* 회원 탈퇴 */}
          <div className="settings-section">
            <h2>회원 탈퇴</h2>
            <p>회원 탈퇴를 원하시면 아래 버튼을 클릭하세요.</p>
            <Link to="/mypage/delete" className="delete-link">회원 탈퇴</Link>
          </div>
        </section>
      </div>

        </main>
        </>
    );
}

export default MypageEdit;

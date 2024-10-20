import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';


const Header = ({adminClick}) => {
    const {accessToken, permissions: auth = []} = useAuth();
    const {signOut} = useAuth();
    const isLoggedIn = Boolean(accessToken);
    const navigate = useNavigate();

    const changeAdminClick = () => {
        if (auth.includes('ADMIN')) {
            adminClick(true);
            navigate('/admin');
        } else {
            alert("접근 권한이 없습니다.");
        }
    };

    const changeMainClick = () => {
        adminClick(false);
        navigate('/')
    };

    const SignInClick = () => {
        navigate('/signin');
    };

    const SignUpClick = () => {
        navigate('/signup');
    };

    return (
        <header>
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo" onClick={changeMainClick}>WarriorDining</Link>

                    <div className="auth-buttons">
                        {
                            !isLoggedIn && (
                                <>
                                    <button onClick={SignInClick}>로그인</button>
                                    <button onClick={SignUpClick}>회원 가입</button>
                                </>
                            )
                        }
                        {auth.includes('ADMIN') && <button onClick={changeAdminClick}>관리자 페이지</button>}
                        {isLoggedIn && <Link to="/mypage/main">마이페이지</Link>}
                        {isLoggedIn && (<button onClick={signOut}>로그아웃</button>)}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

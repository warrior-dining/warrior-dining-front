import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import './css/default.css';
import './css/home.css';

import MembersAdmin from './adminContainers/MembersAdmin';
import PlacesAdmin from './adminContainers/PlacesAdmin';
import ReviewsAdmin from './adminContainers/ReviewsAdmin';
import InquiriesAdmin from './adminContainers/InquiriesAdmin';
import NavBarAdmin from './components/NavBarAdmin';
import MainAdmin from './adminContainers/MainAdmin';
import PlaceAdd from './adminContainers/PlaceAdd';
import ReservationAdmin from "./adminContainers/ReservationAdmin";
import MemberDetail from "./adminContainers/MemberDetail";
import InquirieDtailsAdmin from "./adminContainers/InquiriesDetailAdmin";
import TopReservation from "./containers/TopReservation";
import MonthBest from "./containers/MonthBest";
import RestaurantList from "./containers/RestaurantList";
import InquiryFaq from "./containers/InquiryFaq";
import InquiryCreate from "./containers/InquiryCreate";
import Mypage from "./containers/Mypage";
import Main from "./containers/Main";
import NavBar from "./components/NavBar";
import PlaceDetail from "./adminContainers/PlaceDetail";
import PlaceEdit from "./adminContainers/PlaceEdit";

import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Reservationlist from './containers/ReservationList';
import ReservationDetail from './containers/ReservationDetail';
import MypageEdit from './containers/MypageEdit';
import MypageDelete from './containers/MypageDelete';
import ReviewComment from './containers/ReviewComment';
import MypageReviewlist from './containers/MypageReviewlist';
import MypageReviewEdit from './containers/MypageReviewEdit';
import MypageBookmark from './containers/MypageBookmark';
import MypageInquiry from './containers/MypageInquiry';
import InquiryDetail from './containers/InquiryDetail';
import Detail from './containers/Detail';


function App() {
    const [isAdmin, setIsAdmin] = useState(false);

    // 페이지 이동에 따라 isAdmin 상태 설정
    const updateAdminStatus = () => {
        const currentPath = window.location.pathname;
        setIsAdmin(currentPath.startsWith('/admin'));
    };

    useEffect(() => {
        updateAdminStatus();

        // 뒤로가기 및 앞으로가기 시 admin 상태를 URL에 맞춰 업데이트
        window.addEventListener('popstate', updateAdminStatus);
        window.addEventListener('pushstate', updateAdminStatus); // 커스텀 이벤트를 사용해 상태 업데이트

        return () => {
            window.removeEventListener('popstate', updateAdminStatus);
            window.removeEventListener('pushstate', updateAdminStatus);
        };
    }, []);

  return (
      <>
            <Router>
                <AuthProvider>
                    <div className="App">
                        <Header adminClick={setIsAdmin} />
                        {isAdmin ? (<NavBarAdmin />) : (<NavBar />)}
                        <Routes>
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/admin/members" element={<MembersAdmin />} />
                            <Route path="/admin/members/info/:id" element={<MemberDetail />} />
                            <Route path="/admin/places" element={<PlacesAdmin />} />
                            <Route path="/admin/reviews" element={<ReviewsAdmin />} />
                            <Route path="/admin/reservations" element={<ReservationAdmin/>} />
                            <Route path="/admin/inquiries" element={<InquiriesAdmin />} />
                            <Route path="/admin/inquiries/detail/:id" element={<InquirieDtailsAdmin />} />
                            <Route path="/admin/places/add" element={<PlaceAdd />} />
                            <Route path="/admin/places/info/:id" element={<PlaceDetail />} />
                            <Route path="/admin/places/edit/:id" element={<PlaceEdit />} />
                            <Route path="/topreservation" element={<TopReservation />} />
                            <Route path="/monthbest" element={<MonthBest />} />
                            <Route path="/restaurantlist" element={<RestaurantList />} />
                            <Route path="/inquiryfaq" element={<InquiryFaq />} />
                            <Route path="/inquirycreate" element={<InquiryCreate />} />
                            <Route path="/admin" element={<MainAdmin />} />
                            <Route path="/mypage" element={<Mypage />} />
                            <Route path="/topreservation" element={<TopReservation />} />
                            <Route path="/monthbest" element={<MonthBest />} />
                            <Route path="/restaurantlist" element={<RestaurantList />} />
                            <Route path="/inquiryfaq" element={<InquiryFaq />} />
                            <Route path="/inquirycreate" element={<InquiryCreate />} />
                            <Route path="/admin" element={<MainAdmin />} />
                            <Route path="/mypage/main" element={<Mypage />} />
                            <Route path="/mypage/reservationlist" element={<Reservationlist />} />
                            <Route path="/mypage/reservationdetail" element={<ReservationDetail />} />
                            <Route path="/mypage/edit" element={<MypageEdit />} />
                            <Route path="/mypage/delete" element={<MypageDelete />} />
                            <Route path="/reviewcomment/:id" element={<ReviewComment />} />
                            <Route path="/mypage/reviewlist" element={<MypageReviewlist />} />
                            <Route path="/mypage/reviewedit/:id" element={<MypageReviewEdit />} />
                            <Route path="/mypage/bookmark" element={<MypageBookmark />} />
                            <Route path="/mypage/inquiry" element={<MypageInquiry />} />
                            <Route path="/inquiry/detail/:id" element={<InquiryDetail />} />
                            <Route path="/restaurant/:id" element={<Detail />} />
                            <Route path="/" element={<Main />} />
                        </Routes>
                        <Footer />
                    </div>
                </AuthProvider>
            </Router>
      </>
  );
}

export default App;

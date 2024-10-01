import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
 
  useEffect(()=> {

  }, []);

  return (
    <Router>
    <div className="App">
      <Header adminClick={setIsAdmin} />
      {isAdmin ? (
        <NavBarAdmin />
      ) : (
        <>      
        <NavBar />      
      </>
    )}
        <Routes>
            <Route path="/admin/members" element={<MembersAdmin />} />
            <Route path="/admin/members/info" element={<MemberDetail />} />
            <Route path="/admin/places" element={<PlacesAdmin />} />
            <Route path="/admin/reviews" element={<ReviewsAdmin />} />
            <Route path="/admin/reservations" element={<ReservationAdmin/>} />
            <Route path="/admin/inquiries" element={<InquiriesAdmin />} />
            <Route path="/admin/inquiries/detail" element={<InquirieDtailsAdmin />} />
            <Route path="/admin/places/add" element={<PlaceAdd />} />
            <Route path="/admin/places/detail" element={<PlaceDetail />} />
            <Route path="/admin/places/edit" element={<PlaceEdit />} />
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
            <Route path="/reviewcomment" element={<ReviewComment />} />
            <Route path="/mypage/reviewlist" element={<MypageReviewlist />} />
            <Route path="/mypage/reviewEdit" element={<MypageReviewEdit />} />
            <Route path="/mypage/bookmark" element={<MypageBookmark />} />
            <Route path="/mypage/inquiry" element={<MypageInquiry />} />
            <Route path="/inquiry/detail" element={<InquiryDetail />} />
            <Route path="/restaurant/detail" element={<Detail />} />
          {/* 다른 경로들도 여기 추가할 수 있습니다. */}
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

export default App;

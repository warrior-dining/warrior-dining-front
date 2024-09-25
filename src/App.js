import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import './css/default.css';
import './css/home.css';
import './css/mainAdmin.css';
import MembersAdmin from './containers/MembersAdmin';
import PlacesAdmin from './containers/PlacesAdmin';
import ReviewsAdmin from './containers/ReviewsAdmin';
import InquiriesAdmin from './containers/InquiriesAdmin';
import NavBarAdmin from './components/NavBarAdmin';
import MainAdmin from './containers/MainAdmin';
import './css/memberList.css';

import PlaceAdd from './containers/PlaceAdd';
import ReservationAdmin from "./containers/ReservationAdmin";



function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <NavBarAdmin />
          <Routes>
            {/* 다른 경로들도 여기 추가할 수 있습니다. */}
            <Route path="/admin/members" element={<MembersAdmin />} /> 
            <Route path="/admin/places" element={<PlacesAdmin />} />
            <Route path="/admin/reviews" element={<ReviewsAdmin />} />
            <Route path="/admin/reservations" element={<ReservationAdmin/>} />
            <Route path="/admin/inquiries" element={<InquiriesAdmin />} />
            <Route path="/admin/places/add" element={<PlaceAdd />} />  
            <Route path="/" element={<MainAdmin />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  </>
  );
}

export default App;

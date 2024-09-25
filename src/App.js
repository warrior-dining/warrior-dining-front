import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Main from './containers/Main';
import TopReservation from './containers/TopReservation';
import MonthBest from './containers/MonthBest';
import InquiryFaq from './containers/InquiryFaq';
import RestaurantList from './containers/RestaurantList';
import InquiryCreate from './containers/InquiryCreate';
import Admin from './adminContainers/Admin';
import NavBarAdmin from './adminContainers/NavBarAdmin';
import './css/home.css';
import './css/default.css';


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
          <Route path="/topreservation" element={<TopReservation />} /> 
          <Route path="/monthbest" element={<MonthBest />} />
          <Route path="/restaurantlist" element={<RestaurantList />} />
          <Route path="/inquiryfaq" element={<InquiryFaq />} />
          <Route path="/inquirycreate" element={<InquiryCreate />} />
          <Route path="/admin" element={<Admin />} />
          {/* 다른 경로들도 여기 추가할 수 있습니다. */}
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

export default App;

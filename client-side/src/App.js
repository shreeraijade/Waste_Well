import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Start from './components/Start';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register2 from './components/Register2';
import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import Navbar2 from './components/Navbar2';
import SellerDashboard from './components/SellerDashboard';
import Prices from './components/Prices';
import { useState } from 'react';
import NotifyToSeller from './components/NotifyToSeller';

function App() {
  const appStyle = {
    backgroundColor: '#f0f8ff', // Light blue background
    color: '#333', // Text color
    padding: '20px', // Add some padding
    minHeight: '100vh' // Make sure it takes full height
  };
  const [notifiendVendors,setNotifications_vendors]=useState([])
  const [garbageNo,setgarbageNo]=useState(-1);
  const [Currentvendor, setCurrentvendor] = useState(null);
  const [CurrentSeller, setCurrentSeller] = useState(null);
  const [PricesOfVendor, setPricesOfVendor] = useState([-1,-1,-1,-1,-1]);

  let navbar;
  if(CurrentSeller){
    navbar=<Navbar2/>
  }else if(Currentvendor){
    navbar=<Navbar/>
  }

  return (
   
    <>
      <BrowserRouter>
        <div style={appStyle}>
          {navbar}
          {/* <Navbar2 /> */}
          <Routes>
            <Route exact path='/' element={<Start />} />
            <Route exact path='/seller/register' element={<Register setCurrentSeller={setCurrentSeller} setCurrentvendor={setCurrentvendor} />} />
            <Route exact path='/vendor/register' element={<Register2  setCurrentvendor={setCurrentvendor}  Currentvendor={Currentvendor} setPricesOfVendor={setPricesOfVendor} setCurrentSeller={setCurrentSeller}/>} />
            <Route exact path='/blogs' element={<Blogs />} />
            <Route exact path='/seller/dashboard' element={<SellerDashboard setNotifications_vendors={setNotifications_vendors} setgarbageNo={setgarbageNo} />} />
            <Route exact path='/vendor/prices' element={<Prices PricesOfVendor={PricesOfVendor} setPricesOfVendor={setPricesOfVendor} Currentvendor={Currentvendor}/>} />
            <Route exact path='/seller/vendor-list' element={<NotifyToSeller notifiendVendors={notifiendVendors} garbageNo={garbageNo} />} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

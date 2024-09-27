import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import { useNavigate } from 'react-router-dom';

function SellerDashboard(props) {

  const {setNotifications_vendors,setgarbageNo} = props
  const navigate=useNavigate();

  const handleclick = async function(garbageNo) {
    try {
      const res = await fetch("http://localhost:8000/api/v1/seller/vendor-list", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ garbageNo: garbageNo })
      });
  
      // Check if the response is not OK (status code outside 200-299 range)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      
      // Check if the data contains the expected structure
      if (!data || !data.respectiveVendors) {
        throw new Error("Invalid response data");
      }
  
      setNotifications_vendors(data.respectiveVendors);
      setgarbageNo(garbageNo)
     
      navigate("/seller/vendor-list");
  
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-5">Choose Your Garbage Category</h1>
      <div className="row justify-content-center">
        {/* Top Row with 3 Boxes */}
        <div className="col-md-4 mb-4" onClick={()=>{handleclick(1)}} >
          <div className="card bg-primary text-white" style={{ width: '250px', height: '250px' }}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <h4>Paper</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4" onClick={()=>{handleclick(2)}}>
          <div className="card bg-danger text-white" style={{ width: '250px', height: '250px' }}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <h4>E-waste</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4" onClick={()=>{handleclick(3)}}>
          <div className="card bg-warning text-dark" style={{ width: '250px', height: '250px' }}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <h4>Plastic</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        {/* Bottom Row with 3 Boxes */}
        <div className="col-md-4 mb-4" onClick={()=>{handleclick(4)}}>
          <div className="card bg-secondary text-white" style={{ width: '250px', height: '250px' }}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <h4>Metal</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4" onClick={()=>{handleclick(5)}}>
          <div className="card bg-success text-white" style={{ width: '250px', height: '250px' }}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <h4>Bio</h4>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default SellerDashboard;

import React from 'react';

function VendorCard(props) {
    const {vendor,garbageNo}=props
    return (
        <div className="container mt-4">
          <div className="card text-dark" style={{ backgroundColor: '#d6eaff', width: '100%' }}>
            <div className="card-body">
              <h5 className="card-title">Vendor: {vendor.name}</h5>
              <p className="card-text">Contact: {vendor.contact}</p>
              <p className="card-text">Email: {vendor.email}</p>
              <p className="card-text">Price: {vendor.Prices[garbageNo-1]}</p>
            </div>
          </div>
        </div>
      );
}

export default VendorCard;

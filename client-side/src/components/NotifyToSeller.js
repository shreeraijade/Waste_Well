import React from 'react';
import VendorCard from './VendorCard';

function NotifyToSeller(props) {
    const {notifiendVendors,garbageNo}=props
  return (
    <div>  
      {/* <h1>Vendors list for Your </h1> */}
      {
        notifiendVendors.map((vendor)=>{
            return <VendorCard vendor={vendor} garbageNo={garbageNo} />
        })
      }
    </div>
  );
}

export default NotifyToSeller;

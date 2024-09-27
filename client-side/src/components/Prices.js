// import React from 'react';
import React, { useState } from 'react';
import "../Prices.css";

function Prices(props){
  const {PricesOfVendor,setPricesOfVendor,Currentvendor}=props
    const [prices, setPrices] = useState(PricesOfVendor);
    
      // State to track if the box is in edit mode
      const [isEditing, setIsEditing] = useState({
        paper: false,
        eWaste: false,
        plastic: false,
        metal: false,
        bio: false
      });
    
      // Handle input change for price
      const handlePriceChange = (category, value) => {

         const NewArray=[...prices];
         NewArray[category-1]=value;
         setPrices(NewArray)
      };
    
      // Toggle edit mode for a specific category
      const toggleEdit = (category) => {
        setIsEditing({
          ...isEditing,
          [category]: true
        });
      };
    
      // Update price for the specific category
      const updatePrice = async (category,garbageNo) => {
        setIsEditing({
          ...isEditing,
          [category]: false
        });
        setPricesOfVendor(prices);

        const res = await fetch("http://localhost:8000/api/v1/vendor/update-price",{
          method : "post",
          headers : {
              "Content-Type": "application/json",
          },
          body : JSON.stringify({GarbageNo : garbageNo, Price :prices[garbageNo-1], venderid:Currentvendor._id})
        })



      };
    
      return (
        <div className="dashboard-wrapper">
          <h1 className="title">Choose Your Garbage Category</h1>
          <div className="dashboard-container">
            
            {/* Paper Box */}
            <div className="box paper">
              Paper
              <div className="price">
                {isEditing.paper ? (
                  <input
                    type="number"
                    value={prices[0]}
                    onChange={(e) => handlePriceChange(1, e.target.value)}
                  />
                ) : (
                  <span>Price: Rs{prices[0]}</span>
                )}
              </div>
              <button onClick={() => toggleEdit('paper')}>Edit</button>
              <button onClick={() => updatePrice('paper',1)}>Update</button>
            </div>
    
            {/* E-Waste Box */}
            <div className="box e-waste">
              E-waste
              <div className="price">
                {isEditing.eWaste ? (
                  <input
                    type="number"
                    value={prices[1]}
                    onChange={(e) => handlePriceChange(2, e.target.value)}
                  />
                ) : (
                  <span>Price: Rs{prices[1]}</span>
                )}
              </div>
              <button onClick={() => toggleEdit('eWaste')}>Edit</button>
              <button onClick={() => updatePrice('eWaste',2)}>Update</button>
            </div>
    
            {/* Plastic Box */}
            <div className="box plastic">
              Plastic
              <div className="price">
                {isEditing.plastic ? (
                  <input
                    type="number"
                    value={prices[2]}
                    onChange={(e) => handlePriceChange(3, e.target.value)}
                  />
                ) : (
                  <span>Price: Rs{prices[2]}</span>
                )}
              </div>
              <button onClick={() => toggleEdit('plastic')}>Edit</button>
              <button onClick={() => updatePrice('plastic',3)}>Update</button>
            </div>
    
            {/* Metal Box */}
            <div className="box metal">
              Metal
              <div className="price">
                {isEditing.metal ? (
                  <input
                    type="number"
                    value={prices[3]}
                    onChange={(e) => handlePriceChange(4, e.target.value)}
                  />
                ) : (
                  <span>Price: Rs{prices[3]}</span>
                )}
              </div>
              <button onClick={() => toggleEdit('metal')}>Edit</button>
              <button onClick={() => updatePrice('metal',4)}>Update</button>
            </div>
    
            {/* Bio Box */}
            <div className="box bio">
              Bio
              <div className="price">
                {isEditing.bio ? (
                  <input
                    type="number"
                    value={prices[4]}
                    onChange={(e) => handlePriceChange(5, e.target.value)}
                  />
                ) : (
                  <span>Price: Rs{prices[4]}</span>
                )}
              </div>
              <button onClick={() => toggleEdit('bio')}>Edit</button>
              <button onClick={() => updatePrice('bio',5)}>Update</button>
            </div>
          </div>
        </div>
      );
}
export default Prices;

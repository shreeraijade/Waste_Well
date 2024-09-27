import React from 'react';
import { useNavigate } from 'react-router-dom';

function Start() {
    const navigate = useNavigate()
    const handleclick1 = ()=>{
        navigate("/vendor/register")
    }
    const handleclick2 = ()=>{
        navigate("/seller/register")
    }
    return (
        <div className="container mt-5">
            <h2 className="text-center">Choose Your Sign-Up Type</h2>
            <div className="row">
                <div className="col-md-6 mb-4" onClick={handleclick1}>
                    <div className="card shadow"  style={{ cursor: 'pointer' }}>
                        <div className="card-body text-center">
                            <h4 className="card-title">Sign Up as Vendor</h4>
                            <p className="card-text">Join us as a vendor and showcase your products.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4" onClick={handleclick2}>
                    <div className="card shadow" style={{ cursor: 'pointer' }}>
                        <div className="card-body text-center">
                            <h4 className="card-title">Sign Up as Seller</h4>
                            <p className="card-text">Become a seller and start your selling journey.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Start;

// import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const navigate = useNavigate();
    const {setCurrentSeller,setCurrentvendor}=props


    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [contact, setcontact] = useState("");
    const [address, setaddress] = useState("");

    const handleOnChange=function(e){
        const {name,value} = e.target
        if(name==="name") setname(value)
        if(name==="email") setemail(value)
        if(name==="password") setpassword(value)
        if(name==="contact") setcontact(value)
        if(name==="address") setaddress(value)
    }


    const handleSubmit = async function(e){
        e.preventDefault()
        const res= await fetch("http://localhost:8000/api/v1/seller/register",
            {
                method : "post",
                headers : {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({name,email,password,contact,address})
            }
        )

        const data = await res.json()
        // console.log(data)
        setCurrentSeller(data.seller)
        setCurrentvendor(null)

        
       navigate("/seller/dashboard")
    }
    return (
        <div className="container">
            <h2 className="text-center">Sign Up As A Seller</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        required
                        value={address}
                        onChange={handleOnChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="contactNumber"
                        name="contact"
                        required
                        value={contact}
                        onChange={handleOnChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}

export default Register;

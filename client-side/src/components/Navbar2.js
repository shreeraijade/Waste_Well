import React from 'react';
import { Link } from 'react-router-dom';

function Navbar2() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* Logo */}
                <Link className="navbar-brand" to="/seller/dashboard">
                    <img
                        src="https://via.placeholder.com/50" 
                        alt="Logo"
                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                    />
                    Seller Dashboard
                </Link>

                {/* Toggle Button for Mobile View */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Blogs */}
                        <li className="nav-item ms-3">
                            <Link className="nav-link" to="/blogs">
                                Blogs
                            </Link>
                        </li>
                        {/* Notifications */}
                        <li className="nav-item ms-3">
                            <Link className="nav-link" to="/seller/notifications">
                                Notifications
                                <span className="badge bg-danger ms-1">0</span> {/* Notification badge */}
                            </Link>
                        </li>
                        {/* Stats */}
                        <li className="nav-item ms-3">
                            <Link className="nav-link" to="/seller/stats">
                                Stats
                            </Link>
                        </li>
                        
                        {/* Profile */}
                        <li className="nav-item ms-3">
                            <Link className="nav-link" to="/seller/profile">
                                My Profile
                            </Link>
                        </li>
                        {/* Settings */}
                        <li className="nav-item ms-3">
                            <Link className="nav-link" to="/seller/settings">
                                Settings
                            </Link>
                        </li>
                        {/* Logout */}
                        <li className="nav-item ms-3">
                            <Link className="nav-link" to="/seller/logout">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar2;

// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => (
  <div className="sidebar">
    <h3>🍽️ Menu</h3>
    <nav>
      <ul>
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/">🔍 Search</Link></li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;

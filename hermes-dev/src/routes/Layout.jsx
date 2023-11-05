import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';

const Layout = ({ user }) => {
  const [userPoints, setUserPoints] = useState(0);
  
  useEffect(() => {
    const fetchUserPoints = async () => {
      const supabaseUrl = 'https://afeqcqvlzcbzfdqvsusz.supabase.co/rest/v1/users';
      const serviceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY; // Ensure you have this value correctly set in your environment

      try {
        const response = await axios.get(`${supabaseUrl}?username=eq.${user.username}`, {
          headers: {
            'apikey': serviceRoleKey,
            'Authorization': `Bearer ${serviceRoleKey}`,
          },
        });

        if (response.data.length > 0) {
          setUserPoints(response.data[0].points);
        }
      } catch (error) {
        console.error('Error fetching user points:', error);
      }
    };

    if (user && user.username) {
      fetchUserPoints();
    }
  }, [user]);

  return (
    <div>
      <div className="sidenav">
        <img src="https://i.imgur.com/R0Glr9A.png" width="150px" alt="Logo"></img>
        <Link className='sidenav-link' to="/services">Find Services</Link>
        <Link className='sidenav-link' to="/add-service">Add a Service</Link>
        <p>Balance: <span style={{ color: '#39CC98' }}>{userPoints} Points</span></p>
        <img className="sidenav-img" src="https://shimmering-stardust-c75334.netlify.app/assets/peeking.7c0ab599.png" alt="Peeking Character"></img>
      </div>
      <div className="whole-page">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/protected/dashboard', {
                    headers: { 'Authorization': `Bearer ${token}` }  // Add 'Bearer ' prefix here
                });
                setMessage(response.data.message);
            } catch (error) {
                console.error(error.response.data);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{message}</p>
            <button onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
            }}>Logout</button>
        </div>
    );
};

export default Dashboard;


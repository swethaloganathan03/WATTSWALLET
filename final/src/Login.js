import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css';

const Login = () => {
    const [serviceNumber, setServiceNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [billAmount, setBillAmount] = useState(null);

    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                consumerNo: serviceNumber,
                phoneNumber
            });

            // Check if billAmount is present in the response data
            if (response.data.billAmount) {
                setBillAmount(response.data.billAmount);
                setMessage('Login successful! Bill found.');

                // Redirect to ReceiptPage with bill details
                navigate('/receipt', {
                    state: {
                        serviceNumber,
                        phoneNumber,
                        billAmount: response.data.billAmount // Ensure billAmount is sent
                    }
                });
            } else {
                setBillAmount(null);
                setMessage(response.data.message);
            }
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.error
                : 'Server error';
            setMessage(errorMessage);
        }
    };

    return (
        <div className="ddd">        <div className="login-container">
            <h2>Login</h2>
            <div className="login-form-wrapper"> {/* Wrapped the form in a div */}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Service Number:</label>
                        <input 
                            type="text" 
                            value={serviceNumber} 
                            onChange={(e) => setServiceNumber(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input 
                            type="text" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
            {message && <p className="login-message">{message}</p>}
        </div>
        </div>

    );
};

export default Login;

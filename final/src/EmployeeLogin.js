import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeLogin.css'; // Ensure to create a CSS file for styles

const EmployeeLogin = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Hardcoded employee credentials
    const employeeCredentials = [
        { employeeId: 'emp123', password: 'password123' },
        { employeeId: 'emp456', password: 'password456' },
        { employeeId: 'emp789', password: 'password789' }
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        const foundEmployee = employeeCredentials.find(
            (emp) => emp.employeeId === employeeId && emp.password === password
        );

        if (foundEmployee) {
            setSuccessMessage('Login successful!');
            setError('');
            setTimeout(() => {
                navigate('/adminservice'); // Navigate to AdminService component
            }, 1000);
        } else {
            setError('Invalid Employee ID or Password');
            setSuccessMessage('');
        }
    };

    return (
        <div className="employee-login-container">
            <form onSubmit={handleLogin} className="employee-login-form">
                <h2>ADMIN LOGIN</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <div>
                    <label>ADMIN ID:</label>
                    <input
                        type="text"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>PASSWORD</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default EmployeeLogin;

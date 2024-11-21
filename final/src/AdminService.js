import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminService.css';

const AdminService = () => {
    const navigate = useNavigate(); // Initialize navigate function

    // Function to handle navigation to AdminBillCal component
    const handleGoToBillCalculator = () => {
        navigate('/adminbillcal'); // Navigate to AdminBillCal component route
    };

    // Function to handle navigation to BillHistory component
    const handleViewBillHistory = () => {
        navigate('/billhistory'); // Navigate to BillHistory component route
    };

    // Function to handle navigation to ViewUncalculatedBills component
    const handleViewUncalculatedBills = () => {
        navigate('/viewuncalculatedbills'); // Navigate to ViewUncalculatedBills component route
    };

    // Function to handle navigation to ViewPaidBills component
    const handleViewPaidBills = () => {
        navigate('/viewpaidbills'); // Navigate to ViewPaidBills component route
    };

    return (
        <div className="admin-service-container">
            {/* First row: Calculate Bill and View Calculated Bill */}
            <div className="service-box calculate-bill">
                <h3>Calculate Bill</h3>
                <p>
                    Use this service to calculate the electricity bill based on the units consumed. 
                    Simply enter the required details, and we'll generate an accurate bill.
                </p>
                <button onClick={handleGoToBillCalculator}>Go to Bill Calculator</button>
            </div>

            <div className="service-box view-bill">
                <h3>View Calculated Bill</h3>
                <p>
                    View all your previously calculated bills. Keep track of your past electricity 
                    usage and the corresponding charges in a detailed summary.
                </p>
                <button onClick={handleViewBillHistory}>View Bill History</button>
            </div>

            {/* Second row: View Uncalculated Bills and View Paid Bills */}
            <div className="service-box view-uncalculated-bills">
                <h3>View Uncalculated Bills</h3>
                <p>
                    Check for any pending bills that are yet to be calculated. This service helps 
                    you track bills that need attention.
                </p>
                <button onClick={handleViewUncalculatedBills}>View Uncalculated Bills</button>
            </div>

            <div className="service-box view-paid-bills">
                <h3>View Paid Bills</h3>
                <p>
                    View all your paid bills and their receipts. Keep a record of your past payments 
                    and access the details whenever needed.
                </p>
                <button onClick={handleViewPaidBills}>View Paid Bills</button>
            </div>
        </div>
    );
};

export default AdminService;

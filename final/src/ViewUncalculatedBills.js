import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewUncalculatedBills.css';
import './DBBillCal'; // Ensure this import is used correctly

const ViewUncalculatedBills = () => {
    const [uncalculatedBills, setUncalculatedBills] = useState([]); // State to store the uncalculated bills
    const navigate = useNavigate(); // Hook to navigate to different routes

    // Function to fetch uncalculated bills from the server
    const fetchUncalculatedBills = async () => {
        try {
            const response = await fetch('http://localhost:3001/uncalculatedBills');
            const data = await response.json();
            setUncalculatedBills(data); // Set the fetched data in state
        } catch (error) {
            console.error('Error fetching uncalculated bills:', error);
        }
    };

    // Function to handle the click event for calculating the bill
    const handleCalculateClick = (consumerNo) => {
        navigate(`/dbbillcal/${consumerNo}`); // Navigate to DBBillCal component with consumer number
    };

    // Function to download the ZIP file
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/path-to-zip/ViewUncalculatedBills.zip'; // Update with the correct path to the ZIP file
        link.download = 'ViewUncalculatedBills.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Fetch uncalculated bills when the component mounts
    useEffect(() => {
        fetchUncalculatedBills();
    }, []);

    return (
        <div className="spotify">
            <div className="container">
                <h2>Uncalculated Bills</h2>
                {uncalculatedBills.length > 0 ? (
                    <table className="bills-table">
                        <thead>
                            <tr>
                                <th>Consumer Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uncalculatedBills.map((bill) => (
                                <tr key={bill._id}>
                                    <td>{bill.consumerNo}</td> {/* Display the consumer number */}
                                    <td>
                                        <button 
                                            className="calculate-button" 
                                            onClick={() => handleCalculateClick(bill.consumerNo)} // Pass the consumer number for calculation
                                        >
                                            Calculate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No uncalculated bills found.</p> // Display this message if no bills are found
                )}
                {/* Add button to download ZIP */}
                <button className="download-zip-button" onClick={handleDownload}>
                    Download ZIP
                </button>
            </div>
        </div>
    );
};

export default ViewUncalculatedBills;

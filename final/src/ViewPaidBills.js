import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewPaidBills.css'; 

const ViewPaidBills = () => {
    const [paidBills, setPaidBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPaidBills = async () => {
            try {
                const response = await axios.get('http://localhost:3001/paidBills');
                setPaidBills(response.data);
            } catch (err) {
                setError('Error fetching paid bills.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPaidBills();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="instagram">
        <div className="paid-bills-container"> {/* Apply the container class here */}
            <h2>Paid Bills</h2>
            <p>List of all paid bills and their receipts will be available here.</p>
            <table className="paid-bills-table"> {/* Apply the table class here */}
                <thead>
                    <tr>
                        <th>Service Number</th>
                        <th>Phone Number</th>
                        <th>Bill Amount</th>
                        <th>Status</th>
                        <th>Payment Date</th>
                    </tr>
                </thead>
                <tbody>
                    {paidBills.map((bill) => (
                        <tr key={bill.serviceNumber}>
                            <td>{bill.serviceNumber}</td>
                            <td>{bill.phoneNumber}</td>
                            <td>Rs.{bill.billAmount}</td>
                            <td>{bill.status}</td>
                            <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default ViewPaidBills;

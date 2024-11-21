import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import './ReceiptPage.css'; // Separate CSS for this page
import { useLocation } from 'react-router-dom'; // Import useLocation to access location

const ReceiptPage = () => {
    const location = useLocation(); // Get the location object
    const { serviceNumber, phoneNumber, billAmount } = location.state || {}; // Destructure safely

    const [isPaid, setIsPaid] = useState(false); // State to track payment status
    const [status, setStatus] = useState(''); // State to hold the status message
    const [isLoading, setIsLoading] = useState(false); // State for loading status

    // Function to check if the payment has already been made
    const checkPaymentStatus = () => {
        fetch('http://localhost:3001/checkPaymentStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ serviceNumber }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.paid) {
                setIsPaid(true); // Set paid state to true
                setStatus('Paid'); // Set status to "Paid"
            }
        })
        .catch((error) => {
            console.error('Error checking payment status:', error);
        });
    };

    useEffect(() => {
        checkPaymentStatus(); // Call the function when component mounts
    }, [serviceNumber]);

    // Function to download the receipt as a PDF
    const downloadReceipt = () => {
        const doc = new jsPDF();
        doc.text(`Receipt for Service Number: ${serviceNumber}`, 10, 10);
        doc.text(`Phone Number: ${phoneNumber}`, 10, 20);
        doc.text(`Bill Amount: ₹${billAmount}`, 10, 30);
        doc.save(`receipt_${serviceNumber}.pdf`); // Save the PDF
    };

    const handlePay = () => {
        if (isLoading) return; // Prevent multiple submissions

        alert('Proceed to payment!');

        // Simulate uploading the payment status to the database
        const dataToUpload = {
            serviceNumber,
            phoneNumber,
            billAmount,
            status: 'Paid', // Add the status
        };

        setIsLoading(true); // Set loading state

        // Update the paid bill collection in your backend
        fetch('http://localhost:3001/uploadPaidBill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToUpload),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the response is JSON
        })
        .then(data => {
            console.log('Payment status updated:', data);
            setIsPaid(true); // Update state to indicate payment is done
            setStatus('Paid'); // Set status to "Paid"
        })
        .catch((error) => {
            console.error('Error:', error);
            setStatus('Payment failed. Please try again.'); // Set error message
        })
        .finally(() => {
            setIsLoading(false); // Reset loading state
        });
    };

    return (
        <div className="anu">
        <div className="receipt-container">
            <h2>Receipt</h2>
            <p><strong>Consumer Number:</strong> {serviceNumber}</p>
            <p><strong>Phone Number:</strong> {phoneNumber}</p>
            <p><strong>Bill Amount:</strong> ₹{billAmount}</p>
            <p><strong>Status:</strong> {status}</p> {/* Display the payment status */}
            <div className="button-group">
                <button 
                    onClick={downloadReceipt} 
                    className="download-button" 
                    disabled={!isPaid} // Disable button until payment is made
                >
                    Download Receipt
                </button>
                {!isPaid && (
                    <button 
                        onClick={handlePay} 
                        className="pay-button" 
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? 'Processing...' : 'Pay'}
                    </button>
                )}
            </div>
        </div>
        </div>
    );
};

export default ReceiptPage;

import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf'; // PDF generation library
import JSZip from 'jszip'; // Zip file library
import { saveAs } from 'file-saver'; // For saving the zip file
import './BillHistory.css'; // Import CSS for styling

const BillHistory = () => {
    const [bills, setBills] = useState([]); // State to hold bill data
    const [error, setError] = useState(null); // State to hold error messages

    useEffect(() => {
        // Fetch bill data from the backend API
        fetch('http://localhost:3001/bills')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setBills(data); // Set fetched data to bills state
                setError(null); // Clear error if successful
            })
            .catch((error) => {
                console.error('Error fetching bill history:', error);
                setError('Failed to fetch bill history. Please try again.'); // Set error message
            });
    }, []); // Empty dependency array to run effect once on mount

    // Function to create a PDF document for each bill
    const generatePDF = (bill) => {
        const doc = new jsPDF();
        doc.text(`Bill Details for Consumer No: ${bill.consumerNo}`, 10, 10);
        doc.text(`Amount: ₹${bill.billAmount}`, 10, 20);
        doc.text(`Date: ${new Date(bill.createdAt).toLocaleDateString()}`, 10, 30);

        return doc.output('arraybuffer'); // Return the PDF content as ArrayBuffer
    };

    // Function to generate and download all bills as a zip file
    const handleDownloadZip = () => {
        const zip = new JSZip(); // Create a new zip instance

        // Add each bill as a PDF in the zip folder
        bills.forEach((bill) => {
            const pdfContent = generatePDF(bill); // Generate PDF for each bill
            zip.file(`Bill_${bill.consumerNo}.pdf`, pdfContent); // Add PDF to the zip with a dynamic name
        });

        // Generate the zip and trigger download
        zip.generateAsync({ type: 'blob' })
            .then((content) => {
                saveAs(content, 'Bills.zip'); // Save the zip file with the name "Bills.zip"
            })
            .catch((error) => {
                console.error('Error generating zip file:', error);
            });
    };

    return (
        <div className="dingu">
            <div className="bill-history-container">
                <h2>Calculated Bill History</h2>
                {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
                {bills.length > 0 ? (
                    <>
                        <ul className="bill-history-list">
                            {bills.map((bill) => (
                                <li key={bill._id} className="bill-item">
                                    Consumer No: {bill.consumerNo}, Amount: ₹{bill.billAmount}, Date: {new Date(bill.createdAt).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                        {/* Add the Download All as Zip button */}
                        <button className="download-zip-button" onClick={handleDownloadZip}>
                            Download All as Zip
                        </button>
                    </>
                ) : (
                    <p>No bills found.</p> // Message if no bills exist
                )}
            </div>
        </div>
    );
};

export default BillHistory;

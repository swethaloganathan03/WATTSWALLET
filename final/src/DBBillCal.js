import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import to retrieve URL params
import './AdminBillCal.css';
import DomesticBillCal from './DomesticBillCal';
import CommercialBillCal from './CommercialBillCal';

const DBBillCal = () => {
    const { consumerNo } = useParams(); // Get consumerNo from URL params
    const [tariff, setTariff] = useState('DOMESTIC');
    const [billingCycle, setBillingCycle] = useState('Bi-monthly');
    const [contractedLoad, setContractedLoad] = useState('');
    const [consumedUnits, setConsumedUnits] = useState('');
    const [billAmount, setBillAmount] = useState(null); // State to store the calculated bill amount

    useEffect(() => {
        // Consumer number is already provided, so no need to set it manually
        console.log('Calculating bill for consumer:', consumerNo);
    }, [consumerNo]);

    const handleCalculateBill = (calculatedBill) => {
        setBillAmount(calculatedBill); // Update the billAmount state with the calculated bill
    };

    const handleUpload = () => {
        const dataToUpload = {
            consumerNo, // Using the consumerNo from the URL params
            billAmount,
        };

        console.log("Uploading data to the database:", dataToUpload);
        
        fetch('http://localhost:3001/uploadBill', {
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
            return response.text();
        })
        .then(data => {
            console.log(data);
            // Optionally reset the form or provide feedback to the user
            setConsumedUnits('');
            setBillAmount(null); // Reset the bill amount after upload
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="bill-calculator-container">
            <h2>Bill Calculator</h2>
            <form onSubmit={(e) => e.preventDefault()}>

                {/* Consumer No field is no longer editable, it comes from the previous page */}
                <div className="form-group">
                    <label>Consumer No:</label>
                    <input
                        type="text"
                        value={consumerNo}
                        readOnly // Make this field read-only
                    />
                </div>

                <div className="form-group">
                    <label>Tariff Check</label>
                    <select value={tariff} onChange={(e) => setTariff(e.target.value)}>
                        <option value="DOMESTIC">DOMESTIC</option>
                        <option value="COMMERCIAL">COMMERCIAL</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Billing cycle *</label>
                    <select value={billingCycle} onChange={(e) => setBillingCycle(e.target.value)}>
                        <option value="Monthly">Monthly</option>
                        <option value="Bi-monthly">Bi-monthly</option>
                    </select>
                </div>

                {tariff !== 'DOMESTIC' && (
                    <>
                        <div className="form-group">
                            <label>Contracted load (Not required for 'Domestic tariff')</label>
                            <input
                                type="text"
                                value={contractedLoad}
                                onChange={(e) => setContractedLoad(e.target.value)}
                            />
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label>Consumed Units:</label>
                    <input
                        type="text"
                        value={consumedUnits}
                        onChange={(e) => setConsumedUnits(e.target.value)}
                        required
                    />
                </div>
            </form>

            {tariff === 'DOMESTIC' && (
                <DomesticBillCal 
                    consumedUnits={consumedUnits} 
                    onCalculate={handleCalculateBill} 
                />
            )}

            {tariff === 'COMMERCIAL' && (
                <CommercialBillCal 
                    consumedUnits={consumedUnits} 
                    onCalculate={handleCalculateBill} 
                />
            )}

            <button onClick={handleUpload} disabled={!billAmount}>Upload to DB</button>

            {/* Display the calculated bill amount */}
            {billAmount !== null && (
                <div className="calculated-bill">
                    <h3>Calculated Bill Amount: ₹{billAmount}</h3>
                </div>
            )}
        </div>
    );
};

export default DBBillCal;

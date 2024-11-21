import React, { useState, useEffect } from 'react';
import DomesticBillCal from './DomesticBillCal';
import CommercialBillCal from './CommercialBillCal';
import axios from 'axios';

function AdminBillCal() {
    const [consumerNo, setConsumerNo] = useState('');
    const [currentReading, setCurrentReading] = useState('');
    const [previousReading, setPreviousReading] = useState(null);
    const [unitsConsumed, setUnitsConsumed] = useState(null);
    const [billType, setBillType] = useState('');
    const [contractorLoad, setContractorLoad] = useState('');
    const [kmvh, setKmvh] = useState('');
    const [md, setMd] = useState('');
    const [showPreviousReading, setShowPreviousReading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [showBillCalculator, setShowBillCalculator] = useState(false);
    const [calculatedBill, setCalculatedBill] = useState(null);

    const handleFetchPreviousReading = async () => {
        try {
            if (!consumerNo) {
                alert('Please enter a valid consumer number.');
                return;
            }
    
            const response = await axios.get(`http://localhost:3001/api/getPreviousReading/${consumerNo}`);
            
            if (response.data && response.data.previousReading !== undefined) {
                setPreviousReading(response.data.previousReading);
                setShowPreviousReading(true);
            } else {
                alert('No previous reading found for this consumer number.');
                setPreviousReading(null);
                setShowPreviousReading(false);
            }
        } catch (error) {
            console.error('Error details:', error.response || error);
            if (error.response?.status === 404) {
                alert('Consumer number not found. Please check and try again.');
            } else {
                alert('Error fetching previous reading. Please try again later.');
            }
            setPreviousReading(null);
            setShowPreviousReading(false);
        }
    };

    const handleCurrentReadingChange = (e) => {
        setCurrentReading(e.target.value);
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1000);
    };

    useEffect(() => {
        if (previousReading !== null && currentReading !== '' && !isTyping) {
            const calculatedUnits = parseFloat(currentReading) - parseFloat(previousReading);
            if (calculatedUnits < 0) {
                alert("Current reading cannot be lower than previous reading.");
                setUnitsConsumed(null);
            } else {
                setUnitsConsumed(calculatedUnits);
            }
        }
    }, [currentReading, previousReading, isTyping]);

    const handleCalculate = () => {
        if (!currentReading) {
            alert("Please enter the current reading.");
            return;
        }

        if (!unitsConsumed || unitsConsumed <= 0) {
            alert("Invalid units consumed. Please check the readings.");
            return;
        }

        if (!billType) {
            alert("Please select a bill type (Domestic or Commercial).");
            return;
        }

        if (billType === 'commercial') {
            if (!contractorLoad || !kmvh || !md) {
                alert("Please fill out all the fields for Commercial billing.");
                return;
            }
            if (parseFloat(contractorLoad) <= unitsConsumed) {
                alert("Contractor Load should be greater than Units Consumed.");
                return;
            }
            if (parseFloat(md) <= parseFloat(kmvh)) {
                alert("MD should be greater than KMVH.");
                return;
            }
        }

        setShowBillCalculator(true);
    };

    const handleBillCalculation = (bill) => {
        setCalculatedBill(bill);
    };

    const handleUploadBill = async () => {
        if (!consumerNo || !calculatedBill) {
            alert('Consumer number and calculated bill are required to upload.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/uploadBill', {
                consumerNo,
                billAmount: calculatedBill,
            });
            if (response.status === 201) {
                alert('Bill uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading bill:', error);
            alert('Failed to upload bill. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Bill Calculation</h2>
            <input
                type="text"
                placeholder="Enter Consumer Number"
                value={consumerNo}
                onChange={(e) => setConsumerNo(e.target.value)}
            />
            <br />
            <button onClick={handleFetchPreviousReading}>
                Fetch Previous Month Readings
            </button>
            <br />
            <input
                type="number"
                placeholder="Enter Current Month Reading"
                value={currentReading}
                onChange={handleCurrentReadingChange}
                onBlur={() => setIsTyping(false)}
            />
            <br />
            
            {showPreviousReading && (
                <div>
                    <p>Previous Month Reading: {previousReading}</p>
                    <p>Units Consumed: {unitsConsumed !== null ? unitsConsumed : "Invalid reading"}</p>
                </div>
            )}

            <select 
                onChange={(e) => setBillType(e.target.value)} 
                value={billType}
            >
                <option value="">Select Bill Type</option>
                <option value="domestic">Domestic</option>
                <option value="commercial">Commercial</option>
            </select>
            <br />

            {/* Show additional fields only when the commercial bill type is selected */}
            {billType === 'commercial' && (
                <div>
                    <input
                        type="number"
                        placeholder="Enter Contractor Load"
                        value={contractorLoad}
                        onChange={(e) => setContractorLoad(e.target.value)}
                    />
                    <br />
                    <input
                        type="number"
                        placeholder="Enter KMVH"
                        value={kmvh}
                        onChange={(e) => setKmvh(e.target.value)}
                    />
                    <br />
                    <input
                        type="number"
                        placeholder="Enter MD"
                        value={md}
                        onChange={(e) => setMd(e.target.value)}
                    />
                    <br />
                </div>
            )}

            <button onClick={handleCalculate}>Calculate</button>
            <br />

            {/* Show the bill calculator component below the Calculate button */}
            {showBillCalculator && billType && (
                <div>
                    {billType === 'domestic' ? (
                        <DomesticBillCal 
                            consumedUnits={unitsConsumed}
                            onCalculate={handleBillCalculation}
                        />
                    ) : (
                        <CommercialBillCal 
                            consumedUnits={unitsConsumed}
                            onCalculate={handleBillCalculation}
                        />
                    )}
                </div>
            )}

            {/* Show the calculated bill and upload button */}
            {calculatedBill && (
                <div>
                    <h3>Calculated Bill: ₹{calculatedBill}</h3>
                    <button onClick={handleUploadBill}>Upload to DB</button>
                </div>
            )}
        </div>
    );
}

export default AdminBillCal;

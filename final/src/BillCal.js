import React, { useState } from 'react';
import './BillCal.css';
import DomesticBillCal from './DomesticBillCal'; // Import DomesticBillCal component
import CommercialBillCal from './CommercialBillCal'; // Import CommercialBillCal component

const BillCal = () => {
    const [tariff, setTariff] = useState('DOMESTIC');
    const [billingCycle, setBillingCycle] = useState('Bi-monthly');
    const [contractedLoad, setContractedLoad] = useState('');
    const [consumedUnits, setConsumedUnits] = useState('');
    const [kvah, setKvah] = useState('');
    const [mdReached, setMdReached] = useState('');

    const handleCalculate = (e) => {
        e.preventDefault();
        // No calculation logic here, it's handled by respective components based on tariff
    };

    return (
        <div className="bill-calculator-container">
            <h2>Bill Calculator</h2>
            <form onSubmit={handleCalculate}>
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
                        <div className="form-group">
                            <label>KVAH (Not required for 'Domestic tariff')</label>
                            <input
                                type="text"
                                value={kvah}
                                onChange={(e) => setKvah(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>MD Reached (Not required for 'Domestic tariff')</label>
                            <input
                                type="text"
                                value={mdReached}
                                onChange={(e) => setMdReached(e.target.value)}
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

            {/* Conditionally render Domestic or Commercial component */}
            {tariff === 'DOMESTIC' && (
                <DomesticBillCal consumedUnits={consumedUnits} />
            )}

            {tariff === 'COMMERCIAL' && (
                <CommercialBillCal consumedUnits={consumedUnits} />
            )}

            <p className="note">
               
            </p>
        </div>
    );
};

export default BillCal;

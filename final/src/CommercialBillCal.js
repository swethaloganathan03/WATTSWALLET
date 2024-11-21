import React, { useState } from 'react';

const CommercialBillCal = ({ consumedUnits, onCalculate }) => {
    const calculateBill = () => {
        let calculatedBill = 0;
        const units = parseFloat(consumedUnits);

        let fixedCharge = 0;
        let energyCharge = 0;

        if (units <= 50) {
            fixedCharge = 1 * 107; // Fixed charge for consumption ≤ 50 units
            energyCharge = units * 6.45; // Energy charge (645 paise = 6.45 INR per kWh)
        } else {
            if (1 <= 50) {
                fixedCharge = 1 * 107; // Fixed charge for 0-50kW
            } else if (1 > 50 && 1 <= 112) {
                fixedCharge = 1 * 322; // Fixed charge for 50-112kW
            } else {
                fixedCharge = 1 * 589; // Fixed charge for >112kW
            }
            energyCharge = units * 10.15; // Energy charge (1015 paise = 10.15 INR per kWh)
        }

        calculatedBill = fixedCharge + energyCharge;

        onCalculate(calculatedBill.toFixed(2)); // Call the parent callback with the bill amount
    };

    return (
        <div>
            <button onClick={calculateBill}>Calculate Commercial Bill</button>
        </div>
    );
};

export default CommercialBillCal;

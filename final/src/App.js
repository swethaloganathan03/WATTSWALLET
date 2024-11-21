import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Services from './Services';
import Login from './Login';
import EmployeeLogin from './EmployeeLogin';
import AdminService from './AdminService';
import AdminBillCal from './AdminBillCal'; // Import the AdminBillCal component
import BillHistory from './BillHistory'; // Import the BillHistory component
import ReceiptPage from './ReceiptPage'; // Import the ReceiptPage
import ViewUncalculatedBills from './ViewUncalculatedBills'; // Import the new component
import ViewPaidBills from './ViewPaidBills'; // Import the new component
import DBBillCal from './DBBillCal'; // Import the DBBillCal component

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<EmployeeLogin />} />
          <Route path="/adminservice" element={<AdminService />} />
          <Route path="/adminbillcal" element={<AdminBillCal />} />
          <Route path="/billhistory" element={<BillHistory />} />
          <Route path="/receipt" element={<ReceiptPage />} />
          <Route path="/viewuncalculatedbills" element={<ViewUncalculatedBills />} />
          <Route path="/viewpaidbills" element={<ViewPaidBills />} />
          <Route path="/dbbillcal/:consumerNo" element={<DBBillCal />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

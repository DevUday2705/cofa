import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/components/Dashboard";
import CreateFund from "@/components/CreateFund";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-fund" element={<CreateFund />} />
      </Routes>
    </Router>
  );
};

export default App;

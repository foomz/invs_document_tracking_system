import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for Navbar styles

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/documents" className="nav-item">Documents</Link>
      <Link to="/outgoing" className="nav-item">Outgoing</Link>
      <Link to="/outadinvs" className="nav-item">OutADINVS</Link>
      <Link to="/mailed" className="nav-item">Mailed</Link>
      <div className="nav-item dropdown">
        <button className="dropbtn">Background Investigation</button>
        <div className="dropdown-content">
          <Link to="/BIForApplicant">BIForApplicant</Link>
          <Link to="/FinalReport">Final Report</Link>
        </div>
      </div>
      <div className="nav-item dropdown">
        <button className="dropbtn">Operational 2024</button>
        <div className="dropdown-content">
          <Link to="/Operate">Operate</Link>
          <Link to="/CaseOperationalPlan">Case Operational Plan</Link>
          <Link to="/PostOperationReport">Post Operational Plan</Link>
          <Link to="/NoticeOfOperation">Notice of Operation</Link>
        </div>
      </div>
      <div className="nav-item dropdown">
        <button className="dropbtn">Statistics</button>
        <div className="dropdown-content">
          <Link to="/AuthorityToOperate">Authority To Operate</Link>
          <Link to="/COPLAN">Coplan</Link>
          <Link to="/NoticeOperation">Notice Of Operation</Link>
          <Link to="/PostOperationReportStat">Post Operation Report</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

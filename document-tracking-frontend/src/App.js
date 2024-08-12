import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentList from './components/DocumentList';
import DocumentDetail from './components/DocumentDetail';
import DocumentForm from './components/DocumentForm';
import Outgoing from './components/Outgoing';
import OutADINVS from './components/OutADINVS';
import Mailed from './components/Mailed';
import BIForApplicant from './components/BIForApplicant';
import FinalReport from './components/FinalReport';
import Operate from './components/Operate';
import CaseOperationalPlan from './components/CaseOperationalPlan';
import PostOperationReport from './components/PostOperationReport';
import NoticeOfOperation from './components/NoticeOfOperation';
import AuthorityToOperate from './components/AuthorityToOperate';
import COPLAN from './components/COPLAN';
import NoticeOperation from './components/NoticeOperation';
import PostOperationReportStat from './components/PostOperationReportStat';
import Navbar from './components/Navbar';
import './styles.css';


function App() {
  useEffect(() => {
    document.title = 'OCR Document Tracking';
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/documents/new" element={<DocumentForm />} />
          <Route path="/documents/:id/edit" element={<DocumentForm />} />
          <Route path="/documents/:id" element={<DocumentDetail />} />
          <Route path="/documents" element={<DocumentList />} />
          <Route path="/outgoing" element={<Outgoing />} />
          <Route path="/outadinvs" element={<OutADINVS />} />
          <Route path="/mailed" element={<Mailed />} />
          <Route path="/BIForApplicant" element={<BIForApplicant />} />
          <Route path="/FinalReport" element={<FinalReport />} />
          <Route path="/Operate" element={<Operate />} />
          <Route path="/CaseOperationalPlan" element={<CaseOperationalPlan />} />
          <Route path="/PostOperationReport" element={<PostOperationReport />} />
          <Route path="/NoticeOfOperation" element={<NoticeOfOperation />} />
          <Route path="/AuthorityToOperate" element={<AuthorityToOperate />} />
          <Route path="/COPLAN" element={<COPLAN />} />
          <Route path="/NoticeOperation" element={<NoticeOperation />} />
          <Route path="/PostOperationReportStat" element={<PostOperationReportStat />} />
          <Route path="/" element={<DocumentList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

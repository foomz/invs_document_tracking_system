import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DocumentList.css'; // Import the CSS file

function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    axios.get('http://localhost:8000/api/documents/')
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the documents!", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/documents/${id}/`)
      .then(() => {
        setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the document!", error);
      });
  };

  const handleCopyToOutgoing = (document) => {
    const outgoingPayload = {
      tracking_no: document.tracking_no,
      received_from: document.received_from,
      subjects: document.subjects,
      forwarded_to: document.forwarded_to,
      date_transmitted: document.date_transmitted || null,
      received_by: document.received_by || null,
    };

    axios.post('http://localhost:8000/api/outgoing/', outgoingPayload)
      .then(response => {
        console.log("Document copied to outgoing:", response.data);
        navigate('/outgoing');
      })
      .catch(error => {
        console.error("There was an error copying the document to outgoing!", error.response.data);
      });
  };

  const handleCopyToOutADINVS = (document) => {
    const outgoingPayload = {
      tracking_no: document.tracking_no,
      received_from: document.received_from,
      subjects: document.subjects,
      forwarded_to: document.forwarded_to,
      date_transmitted: document.date_transmitted || null,
      received_by: document.received_by || null,
    };

    axios.post('http://localhost:8000/api/outadinvs/', outgoingPayload)
      .then(response => {
        console.log("Document copied to outadinvs:", response.data);
        navigate('/outadinvs');
      })
      .catch(error => {
        console.error("There was an error copying the document to outadinvs!", error.response.data);
      });
  };

  const handleCopyToMailed = (document) => {
    const outgoingPayload = {
      tracking_no: document.tracking_no,
      received_from: document.received_from,
      subjects: document.subjects,
      forwarded_to: document.forwarded_to,
      date_transmitted: document.date_transmitted || null,
      received_by: document.received_by || null,
    };

    axios.post('http://localhost:8000/api/mailed/', outgoingPayload)
      .then(response => {
        console.log("Document copied to mailed:", response.data);
        navigate('/mailed');
      })
      .catch(error => {
        console.error("There was an error copying the document to mailed!", error.response.data);
      });
  };

  const handleCopyToBIForApplicant = (document) => {
    const outgoingPayload = {
      tracking_no: document.tracking_no,
      date_received: document.date_received,
      received_from: document.received_from,
      subjects: document.subjects,
      field_office: document.field_office || null,
      forwarded_to: document.forwarded_to,
      date_transmitted: document.date_transmitted || null,
      received_by: document.received_by || null,
      remarks: document.remarks || null,
      reference_no: document.reference_no || null,
      return_result: document.return_result || null,
    };

    console.log('Outgoing payload for BIForApplicant:', outgoingPayload);

    axios.post('http://localhost:8000/api/biforapplicant/', outgoingPayload)
      .then(response => {
        console.log("Document copied to biforapplicant:", response.data);
        navigate('/biforapplicant');
      })
      .catch(error => {
        console.error("There was an error copying the document to biforapplicant:", error.response.data);
      });
  };

  const handleEdit = (id) => {
    navigate(`/documents/${id}/edit`);
  };

  return (
    <div className="container">
      <h1>Documents</h1>
      <button onClick={() => navigate('/documents/new')} className="button">Add Document</button>
      <table className="document-table">
        <thead>
          <tr>
            <th>Tracking No</th>
            <th>Date Received</th>
            <th>Received From</th>
            <th>Type of Document</th>
            <th style={{ width: '70%' }}>Subjects</th>
            <th>Forwarded To</th>
            <th>Date Transmitted</th>
            <th>Received By</th>
            <th>Remarks</th>
            <th>Reference No</th>
            <th>Encoded By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(document => (
            <tr key={document.id} className="document-item">
              <td>{document.tracking_no}</td>
              <td>{document.date_received}</td>
              <td>{document.received_from}</td>
              <td>{document.type_of_document}</td>
              <td>{document.subjects}</td>
              <td>{document.forwarded_to}</td>
              <td>{document.date_transmitted}</td>
              <td>{document.received_by}</td>
              <td>{document.remarks}</td>
              <td>{document.reference_no}</td>
              <td>{document.encoded_by}</td>
              <td className="actions-cell">
                <div className="actions-container">
                  <button onClick={() => handleEdit(document.id)} className="button">Edit</button>
                  <button onClick={() => handleDelete(document.id)} className="button delete-button">Delete</button>
                  <button onClick={() => handleCopyToOutgoing(document)} className="button">OutGoing</button>
                  <button onClick={() => handleCopyToOutADINVS(document)} className="button">OutADINVS</button>
                  <button onClick={() => handleCopyToMailed(document)} className="button">Mailed</button>
                  <button onClick={() => handleCopyToBIForApplicant(document)} className="button">BIForApplicant</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentList;

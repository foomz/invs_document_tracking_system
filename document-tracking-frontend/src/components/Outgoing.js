import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Outgoing.css';
import { GlobalHotKeys } from 'react-hotkeys';

function Outgoing() {
  const [outgoingDocuments, setOutgoingDocuments] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    // Fetch existing outgoing documents
    axios.get('http://localhost:8000/api/outgoing/')
      .then(response => {
        setOutgoingDocuments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the outgoing documents!", error);
      });
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedRows(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(item => item !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setOutgoingDocuments(prevState =>
      prevState.map(doc =>
        doc.id === id ? { ...doc, [name]: value } : doc
      )
    );
  };

  const handleSave = (id) => {
    const document = outgoingDocuments.find(doc => doc.id === id);
    axios.put(`http://localhost:8000/api/outgoing/${id}/`, document)
      .then(response => {
        setOutgoingDocuments(prevState =>
          prevState.map(doc => (doc.id === id ? response.data : doc))
        );
        setEditMode(null);
      })
      .catch(error => {
        console.error("There was an error saving the document!", error);
      });
  };

  const handleEdit = (id) => {
    setEditMode(id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/outgoing/${id}/`)
      .then(() => {
        setOutgoingDocuments(prevState => prevState.filter(doc => doc.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the document!", error);
      });
  };

  const handlePrint = () => {
    window.print();
  };

  const keyMap = {
    printDocument: "ctrl+p"
  };

  const handlers = {
    printDocument: handlePrint
  };

  return (
    <div className="container">
      <h1>Outgoing Documents</h1>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
        <div>
          <table className="document-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Tracking No</th>
                <th>Received From</th>
                <th>Subjects</th>
                <th>Forwarded To</th>
                <th>Date Transmitted</th>
                <th>Received By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {outgoingDocuments.map(doc => (
                <tr key={doc.id} className={selectedRows.includes(doc.id) ? 'selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(doc.id)}
                      onChange={() => handleCheckboxChange(doc.id)}
                    />
                  </td>
                  <td>
                    {editMode === doc.id ? (
                      <input
                        type="text"
                        name="tracking_no"
                        value={doc.tracking_no}
                        onChange={(e) => handleChange(e, doc.id)}
                      />
                    ) : (
                      doc.tracking_no
                    )}
                  </td>
                  <td>
                    {editMode === doc.id ? (
                      <input
                        type="text"
                        name="received_from"
                        value={doc.received_from}
                        onChange={(e) => handleChange(e, doc.id)}
                      />
                    ) : (
                      doc.received_from
                    )}
                  </td>
                  <td>
                    {editMode === doc.id ? (
                      <input
                        type="text"
                        name="subjects"
                        value={doc.subjects}
                        onChange={(e) => handleChange(e, doc.id)}
                      />
                    ) : (
                      doc.subjects
                    )}
                  </td>
                  <td>
                    {editMode === doc.id ? (
                      <input
                        type="text"
                        name="forwarded_to"
                        value={doc.forwarded_to}
                        onChange={(e) => handleChange(e, doc.id)}
                      />
                    ) : (
                      doc.forwarded_to
                    )}
                  </td>
                  <td>
                    {editMode === doc.id ? (
                      <input
                        type="date"
                        name="date_transmitted"
                        value={doc.date_transmitted}
                        onChange={(e) => handleChange(e, doc.id)}
                      />
                    ) : (
                      doc.date_transmitted
                    )}
                  </td>
                  <td>
                    {editMode === doc.id ? (
                      <input
                        type="text"
                        name="received_by"
                        value={doc.received_by}
                        onChange={(e) => handleChange(e, doc.id)}
                      />
                    ) : (
                      doc.received_by
                    )}
                  </td>
                  <td>
                    {editMode === doc.id ? (
                      <>
                        <button onClick={() => handleSave(doc.id)}>Save</button>
                        <button onClick={() => handleDelete(doc.id)}>Delete</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(doc.id)}>Edit</button>
                        <button onClick={() => handleDelete(doc.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="print-only">
          <table className="document-table">
            <thead>
              <tr>
                <th>Tracking No</th>
                <th>Received From</th>
                <th>Subjects</th>
                <th>Forwarded To</th>
                <th>Date Transmitted</th>
                <th>Received By</th>
              </tr>
            </thead>
            <tbody>
              {outgoingDocuments.filter(doc => selectedRows.includes(doc.id)).map(doc => (
                <tr key={doc.id}>
                  <td>{doc.tracking_no}</td>
                  <td>{doc.received_from}</td>
                  <td>{doc.subjects}</td>
                  <td>{doc.forwarded_to}</td>
                  <td>{doc.date_transmitted}</td>
                  <td>{doc.received_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlobalHotKeys>
    </div>
  );
}

export default Outgoing;

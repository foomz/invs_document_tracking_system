import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Mailed() {
  const [documents, setDocuments] = useState([]);
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    // Fetch existing mailed documents from the API
    axios.get('http://localhost:8000/api/mailed/')
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the mailed documents!", error);
      });
  }, []);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setDocuments(prevState =>
      prevState.map(doc =>
        doc.id === id ? { ...doc, [name]: value } : doc
      )
    );
  };

  const handleSave = (id) => {
    const document = documents.find(doc => doc.id === id);
    axios.put(`http://localhost:8000/api/mailed/${id}/`, document)
      .then(response => {
        setDocuments(prevState =>
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
    axios.delete(`http://localhost:8000/api/mailed/${id}/`)
      .then(() => {
        setDocuments(prevState => prevState.filter(doc => doc.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the document!", error);
      });
  };

  return (
    <div className="container">
      <h1>Mailed Documents</h1>
      <table className="document-table">
        <thead>
          <tr>
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
          {documents.map(doc => (
            <tr key={doc.id}>
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
  );
}

export default Mailed;

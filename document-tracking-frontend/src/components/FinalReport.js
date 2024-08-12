import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FinalReport() {
  const [reports, setReports] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [newReport, setNewReport] = useState({
    tracking_no: '',
    applicant: '',
    ro_do: '',
    date_received: '',
    date_transmitted: '',
    transmitted_to: ''
  });

  useEffect(() => {
    // Fetch existing reports from the API
    axios.get('http://localhost:8000/api/final_report/')
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the reports!", error);
      });
  }, []);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setReports(prevState =>
      prevState.map(report =>
        report.id === id ? { ...report, [name]: value } : report
      )
    );
  };

  const handleSave = (id) => {
    const report = reports.find(rep => rep.id === id);
    // Remove empty date fields to avoid sending them to the API
    const updatedReport = {
      ...report,
      date_received: report.date_received || null,
      date_transmitted: report.date_transmitted || null
    };
    axios.put(`http://localhost:8000/api/final_report/${id}/`, updatedReport)
      .then(response => {
        setReports(prevState =>
          prevState.map(rep => (rep.id === id ? response.data : rep))
        );
        setEditMode(null);
      })
      .catch(error => {
        console.error("There was an error saving the report!", error);
      });
  };

  const handleEdit = (id) => {
    setEditMode(id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/final_report/${id}/`)
      .then(() => {
        setReports(prevState => prevState.filter(rep => rep.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the report!", error);
      });
  };

  const handleNewReportChange = (e) => {
    const { name, value } = e.target;
    setNewReport(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNewReportSave = () => {
    // Remove empty date fields to avoid sending them to the API
    const updatedNewReport = {
      ...newReport,
      date_received: newReport.date_received || null,
      date_transmitted: newReport.date_transmitted || null
    };
    axios.post('http://localhost:8000/api/final_report/', updatedNewReport)
      .then(response => {
        setReports(prevState => [...prevState, response.data]);
        setNewReport({
          tracking_no: '',
          applicant: '',
          ro_do: '',
          date_received: '',
          date_transmitted: '',
          transmitted_to: ''
        });
      })
      .catch(error => {
        console.error("There was an error saving the new report!", error);
      });
  };

  return (
    <div className="container">
      <h1>Final Report Of Background Investigation For Investigation Agent III</h1>
      <table className="document-table">
        <thead>
          <tr>
            <th style={{ width: '50px' }}>No</th>
            <th>Applicant</th>
            <th>RO/DO</th>
            <th>Date Received</th>
            <th>Date Transmitted</th>
            <th>Transmitted To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.tracking_no}</td>
              <td>
                {editMode === report.id ? (
                  <input
                    type="text"
                    name="applicant"
                    value={report.applicant}
                    onChange={(e) => handleChange(e, report.id)}
                  />
                ) : (
                  report.applicant
                )}
              </td>
              <td>
                {editMode === report.id ? (
                  <input
                    type="text"
                    name="ro_do"
                    value={report.ro_do}
                    onChange={(e) => handleChange(e, report.id)}
                  />
                ) : (
                  report.ro_do
                )}
              </td>
              <td>
                {editMode === report.id ? (
                  <input
                    type="date"
                    name="date_received"
                    value={report.date_received || ''}
                    onChange={(e) => handleChange(e, report.id)}
                  />
                ) : (
                  report.date_received
                )}
              </td>
              <td>
                {editMode === report.id ? (
                  <input
                    type="date"
                    name="date_transmitted"
                    value={report.date_transmitted || ''}
                    onChange={(e) => handleChange(e, report.id)}
                  />
                ) : (
                  report.date_transmitted
                )}
              </td>
              <td>
                {editMode === report.id ? (
                  <input
                    type="text"
                    name="transmitted_to"
                    value={report.transmitted_to}
                    onChange={(e) => handleChange(e, report.id)}
                  />
                ) : (
                  report.transmitted_to
                )}
              </td>
              <td>
                {editMode === report.id ? (
                  <>
                    <button onClick={() => handleSave(report.id)}>Save</button>
                    <button onClick={() => handleDelete(report.id)}>Delete</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(report.id)}>Edit</button>
                    <button onClick={() => handleDelete(report.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="number"
                name="tracking_no"
                value={newReport.tracking_no}
                onChange={handleNewReportChange}
                style={{ width: '50px' }}
              />
            </td>
            <td>
              <input
                type="text"
                name="applicant"
                value={newReport.applicant}
                onChange={handleNewReportChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="ro_do"
                value={newReport.ro_do}
                onChange={handleNewReportChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="date_received"
                value={newReport.date_received || ''}
                onChange={handleNewReportChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="date_transmitted"
                value={newReport.date_transmitted || ''}
                onChange={handleNewReportChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="transmitted_to"
                value={newReport.transmitted_to}
                onChange={handleNewReportChange}
              />
            </td>
            <td>
              <button onClick={handleNewReportSave}>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FinalReport;

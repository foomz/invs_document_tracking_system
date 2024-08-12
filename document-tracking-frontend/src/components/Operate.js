import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Import the global styles

function Operate() {
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [newItem, setNewItem] = useState({
    control_no: '',
    adinvs_rs: '',
    reference_no: '',
    rdo: '',
    requesting_party_aoc: '',
    mode_of_opn: '',
    noc: '',
    complainant: '',
    subject: '',
    date_of_opn: '',
    place_of_opn: ''
  });

  useEffect(() => {
    // Fetch existing items from the API
    axios.get('http://localhost:8000/api/Operate/')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the items!", error);
      });
  }, []);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setItems(prevState =>
      prevState.map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSave = (id) => {
    const item = items.find(it => it.id === id);
    axios.put(`http://localhost:8000/api/Operate/${id}/`, item)
      .then(response => {
        setItems(prevState =>
          prevState.map(it => (it.id === id ? response.data : it))
        );
        setEditMode(null);
      })
      .catch(error => {
        console.error("There was an error saving the item!", error);
      });
  };

  const handleEdit = (id) => {
    setEditMode(id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/Operate/${id}/`)
      .then(() => {
        setItems(prevState => prevState.filter(it => it.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the item!", error);
      });
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNewItemSave = () => {
    axios.post('http://localhost:8000/api/Operate/', newItem)
      .then(response => {
        setItems(prevState => [...prevState, response.data]);
        setNewItem({
          control_no: '',
          adinvs_rs: '',
          reference_no: '',
          rdo: '',
          requesting_party_aoc: '',
          mode_of_opn: '',
          noc: '',
          complainant: '',
          subject: '',
          date_of_opn: '',
          place_of_opn: ''
        });
      })
      .catch(error => {
        console.error("There was an error saving the new item!", error);
      });
  };

  return (
    <div className="container">
      <h1>Operate</h1>
      <table className="document-table">
        <thead>
          <tr>
            <th>Control No</th>
            <th>ADINVS-RS</th>
            <th>Reference No</th>
            <th>RDO</th>
            <th>Requesting Party / AOC</th>
            <th>Mode of OPN</th>
            <th>NOC</th>
            <th>Complainant</th>
            <th>Subject</th>
            <th>Date of OPN</th>
            <th>Place of OPN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.control_no}</td>
              <td>
                {editMode === item.id ? (
                  <input
                    type="text"
                    name="adinvs_rs"
                    value={item.adinvs_rs}
                    onChange={(e) => handleChange(e, item.id)}
                  />
                ) : (
                  item.adinvs_rs
                )}
              </td>
              <td>
                {editMode === item.id ? (
                  <input
                    type="text"
                    name="reference_no"
                    value={item.reference_no}
                    onChange={(e) => handleChange(e, item.id)}
                  />
                ) : (
                  item.reference_no
                )}
              </td>
              <td>
                {editMode === item.id ? (
                  <input
                    type="text"
                    name="rdo"
                    value={item.rdo}
                    onChange={(e) => handleChange(e, item.id)}
                  />
                ) : (
                  item.rdo
                )}
              </td>
              <td>
                {editMode === item.id ? (
                  <input
                    type="text"
                    name="requesting_party_aoc"
                    value={item.requesting_party_aoc}
                    onChange={(e) => handleChange(e, item.id)}
                  />
                ) : (
                  item.requesting_party_aoc
                )}
              </td>
              <td>
                {editMode === item.id ? (
                  <input
                    type="text"
                    name="mode_of_opn"
                    value={item.mode_of_opn}
                    onChange={(e) => handleChange(e, item.id)}
                  />
                ) : (
                  item.mode_of_opn
                )}
              </td>
              <td>
                {editMode === item.id ? (
                  <input
                    type="text"
                    name="noc"
                    value={item.noc}
                    onChange={(e) => handleChange(e, item.id)}
                  />
                ) : (
                  item.noc
                )}
              </td>
              <td>
                {editMode === item.id ? (
                  <input
                    type="text"
                    name="complainant"
                    value={item.complainant}
                    onChange={(e) => handleChange(e, item.id)}
                  />
                ) : (
                  item.complainant
                )}
              </td>
              <td>
                {editMode === item.id ? (
                  <input
                    type="text"
                    name="subject"
                    value={item.subject}
                    onChange={(e) => handleChange(e, item.id)}
                  />
                ) : (
                  item.subject
                )}
              </td>
              <td>
                {editMode === item.id ? (
                  <input
                    type="date"
                    name="date_of_opn"
                    value={item.date_of_opn || ''}
                    onChange={(e) => handleChange(e, item.id)}
                  />
                ) : (
                  item.date_of_opn
                )}
              </td>
              <td>
                {editMode === item.id ? (
                  <input
                    type="text"
                    name="place_of_opn"
                    value={item.place_of_opn}
                    onChange={(e) => handleChange(e, item.id)}
                  />
                ) : (
                  item.place_of_opn
                )}
              </td>
              <td>
                {editMode === item.id ? (
                  <>
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                name="control_no"
                value={newItem.control_no}
                onChange={handleNewItemChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="adinvs_rs"
                value={newItem.adinvs_rs}
                onChange={handleNewItemChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="reference_no"
                value={newItem.reference_no}
                onChange={handleNewItemChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="rdo"
                value={newItem.rdo}
                onChange={handleNewItemChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="requesting_party_aoc"
                value={newItem.requesting_party_aoc}
                onChange={handleNewItemChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="mode_of_opn"
                value={newItem.mode_of_opn}
                onChange={handleNewItemChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="noc"
                value={newItem.noc}
                onChange={handleNewItemChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="complainant"
                value={newItem.complainant}
                onChange={handleNewItemChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="subject"
                value={newItem.subject}
                onChange={handleNewItemChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="date_of_opn"
                value={newItem.date_of_opn || ''}
                onChange={handleNewItemChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="place_of_opn"
                value={newItem.place_of_opn}
                onChange={handleNewItemChange}
              />
            </td>
            <td>
              <button onClick={handleNewItemSave}>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Operate;

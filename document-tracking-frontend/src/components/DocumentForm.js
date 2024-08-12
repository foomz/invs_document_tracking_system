import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Tesseract from 'tesseract.js';
import './DocumentForm.css'; // Import the CSS file for styling

function DocumentForm() {
  const [document, setDocument] = useState({
    tracking_no: '',
    date_received: '',
    received_from: '',
    type_of_document: '',
    subjects: '',
    forwarded_to: '',
    date_transmitted: '',
    received_by: '',
    remarks: '',
    reference_no: '',
    encoded_by: ''
  });

  const [image, setImage] = useState(null);
  const cropperRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/documents/${id}/`)
        .then(response => {
          setDocument(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the document!", error);
        });
    } else {
      generateTrackingNo();
    }
  }, [id]);

  const generateTrackingNo = () => {
    axios.get('http://localhost:8000/api/documents/')
      .then(response => {
        const existingTrackingNos = response.data.map(doc => parseInt(doc.tracking_no, 10)).filter(Boolean);
        const maxTrackingNo = existingTrackingNos.length > 0 ? Math.max(...existingTrackingNos) : 0;
        const nextTrackingNo = maxTrackingNo + 1;
        setDocument(prevState => ({
          ...prevState,
          tracking_no: nextTrackingNo.toString()
        }));
      })
      .catch(error => {
        console.error("There was an error fetching existing documents!", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocument(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...document };

    // Remove empty optional fields
    if (!payload.date_transmitted) delete payload.date_transmitted;
    if (!payload.received_by) delete payload.received_by;
    if (!payload.remarks) delete payload.remarks;
    if (!payload.reference_no) delete payload.reference_no;

    if (id) {
      axios.put(`http://localhost:8000/api/documents/${id}/`, payload)
        .then(() => {
          navigate('/documents');
        })
        .catch(error => {
          console.error("There was an error updating the document!", error);
        });
    } else {
      axios.post('http://localhost:8000/api/documents/', payload)
        .then(() => {
          navigate('/documents');
        })
        .catch(error => {
          console.error("There was an error creating the document!", error);
        });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const cropAndExtractText = (fieldName) => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        const croppedUrl = URL.createObjectURL(blob);
        Tesseract.recognize(
          croppedUrl,
          'eng', // Replace 'eng' with the appropriate language code
          {
            logger: (m) => console.log(m)
          }
        )
        .then(({ data: { text } }) => {
          console.log(text);
          setDocument(prevState => ({
            ...prevState,
            [fieldName]: text
          }));
        })
        .catch(error => {
          console.error('Error recognizing text:', error);
        });
      });
    }
  };

  return (
    <div className="container">
      <h1>{id ? 'Edit Document' : 'Add Document'}</h1>
      <form onSubmit={handleSubmit}>
      <div style={{ width: '800px' }} className="form-container">
          <div className="left-column">
            <div>
              <label>Upload Image to Extract Text</label>
              <input type="file" onChange={handleImageChange} accept="image/*" />
            </div>
            {image && (
              <div>
                <Cropper
                  src={image}
                  style={{ height: 400, width: '100%' }}
                  initialAspectRatio={16 / 9}
                  guides={false}
                  ref={cropperRef}
                />
                <button type="button" onClick={() => cropAndExtractText('received_from')}>Extract Received From</button>
                <button type="button" onClick={() => cropAndExtractText('type_of_document')}>Extract Type of Document</button>
                <button type="button" onClick={() => cropAndExtractText('subjects')}>Extract Subjects</button>
                <button type="button" onClick={() => cropAndExtractText('reference_no')}>Extract Reference No</button>
              </div>
            )}
          </div>
          <div className="right-column">
            <div>
              <label>Tracking No</label>
              <input type="text" name="tracking_no" value={document.tracking_no} onChange={handleChange} required />
            </div>
            <div>
              <label>Date Received</label>
              <input type="date" name="date_received" value={document.date_received} onChange={handleChange} required />
            </div>
            <div>
              <label>Received From</label>
              <input type="text" name="received_from" value={document.received_from} onChange={handleChange} required />
            </div>
            <div>
              <label>Type of Document</label>
              <input type="text" name="type_of_document" value={document.type_of_document} onChange={handleChange} list="type_of_document" required />
              <datalist id="type_of_document">
                <option value="MEMO" />
                <option value="ROUTING SLIP" />
                <option value="COPLAN" />
                <option value="NOTICE" />
                <option value="COPLAN & NOTICE" />
                <option value="POST OP" />
                <option value="POST OP REPORT" />
                <option value="DTR" />
                <option value="AUTHORITY TO INVESTIGATE" />
                <option value="COURT ORDER" />
                <option value="REQUEST AUTHORITY TO OPERATE" />
                <option value="LETTER" />
                <option value="RIS" />
                <option value="IRR" />
                <option value="COOR LETTER" />
                <option value="COMPLAINT SHEET" />
                <option value="COOR" />
                <option value="EMAIL" />
                <option value="IPCR" />
                <option value="PRE OPS" />
                <option value="WARRANT OF ARREST" />
                <option value="AO" />
                <option value="WA" />
                <option value="RAI" />
                <option value="LEAVE FORM" />
                <option value="EMAIL-NOTICE" />
                <option value="REPORT" />
                <option value="POSITION DESCRIPTION FORM" />
                <option value="DF" />
                <option value="SUBPOENA" />
                <option value="ORDER" />
                <option value="EMAILED COPLAN & NOTICE" />
                <option value="MEMO & SO" />
                <option value="SO" />
              </datalist>
            </div>
            <div>
              <label>Subjects</label>
              <input type="text" name="subjects" value={document.subjects} onChange={handleChange} required />
            </div>
            <div>
              <label>Forwarded To</label>
              <input type="text" name="forwarded_to" value={document.forwarded_to} onChange={handleChange} required />
            </div>
            <div>
              <label>Date Transmitted</label>
              <input type="date" name="date_transmitted" value={document.date_transmitted} onChange={handleChange} />
            </div>
            <div>
              <label>Received By</label>
              <input type="text" name="received_by" value={document.received_by} onChange={handleChange} />
            </div>
            <div>
              <label>Remarks</label>
              <input type="text" name="remarks" value={document.remarks} onChange={handleChange} />
            </div>
            <div>
              <label>Reference No</label>
              <input type="text" name="reference_no" value={document.reference_no} onChange={handleChange} />
            </div>
            <div>
              <label>Encoded By</label>
              <input type="text" name="encoded_by" value={document.encoded_by} onChange={handleChange} list="encodedByList" required />
              <datalist id="encodedByList">
                <option value="ella" />
                <option value="rezy" />
                <option value="vine" />
              </datalist>
            </div>
            <button type="submit">{id ? 'Update' : 'Submit'}</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DocumentForm;
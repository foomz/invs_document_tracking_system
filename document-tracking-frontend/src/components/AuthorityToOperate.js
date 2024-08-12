import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AuthorityToOperate.css';

const regions = [
  'ADSDO', 'BACDO', 'BARMM', 'BATADO', 'BATDO', 'BOHDO', 'BRO', 'BULDO', 
  'CALABARZON', 'CAR', 'CAVIDO', 'CAVIDO NORTH', 'CAVRO', 'CEBDO', 
  'CELRO', 'CEVRO', 'DADO', 'ILDO', 'IRO', 'ISDO', 'LAGDO', 'LALDO', 
  'LUCDO', 'MIMAROPA', 'NADO', 'NCR', 'NEMRO', 'OLDO', 'PAGDO', 
  'PAMDO', 'PUERDO', 'RIZDO', 'SARDO', 'SEMRO', 'TAGDO', 'TARDO', 'WEVRO'
];

const months = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 
  'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 
  'NOVEMBER', 'DECEMBER'
];

const initialData = regions.reduce((acc, region) => {
  acc[region] = Array(12).fill(0);
  return acc;
}, {});

const AuthorityToOperate = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    axios.get('http://localhost:8000/api/AuthorityToOperate/')
      .then(response => {
        const fetchedData = regions.reduce((acc, region) => {
          acc[region] = Array(12).fill(0);
          return acc;
        }, {});

        response.data.forEach(item => {
          const monthIndex = months.indexOf(item.month);
          if (monthIndex >= 0) {
            fetchedData[item.region][monthIndex] = item.value;
          }
        });

        setData(fetchedData);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleInputChange = (region, monthIndex, value) => {
    const updatedData = {
      ...data,
      [region]: data[region].map((val, idx) => (idx === monthIndex ? Number(value) : val))
    };
    setData(updatedData);
  };

  const handleBlur = (region, month, value) => {
    const payload = { region, month, value: Number(value) };
    axios.post('http://localhost:8000/api/AuthorityToOperate/', payload)
      .catch(error => {
        console.error('There was an error updating the data!', error);
      });
  };

  const calculateTotal = (region) => {
    return data[region].reduce((acc, curr) => acc + curr, 0);
  };

  return (
    <div className="container">
      <h1>Authority to Operate</h1>
      <div className="authority-table">
        <div className="table-header">
          <div className="header-item">Region</div>
          {months.map((month, index) => (
            <div className="header-item" key={index}>{month}</div>
          ))}
          <div className="header-item">Total</div>
        </div>
        {Object.keys(data).map((region) => (
          <div className="table-row" key={region}>
            <div className="row-item">{region}</div>
            {data[region].map((value, monthIndex) => (
              <div className="row-item" key={monthIndex}>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleInputChange(region, monthIndex, e.target.value)}
                  onBlur={(e) => handleBlur(region, months[monthIndex], e.target.value)}
                />
              </div>
            ))}
            <div className="row-item">{calculateTotal(region)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorityToOperate;
import React from 'react';

function DocumentDetail({ match }) {
  return (
    <div>
      <h1>Document Detail for ID: {match.params.id}</h1>
    </div>
  );
}

export default DocumentDetail;

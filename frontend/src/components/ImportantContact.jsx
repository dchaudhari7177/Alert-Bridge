import React from 'react';

const ImportantContacts = () => {
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Important Contacts</h1>
      <ul style={listStyle}>
        <li>Emergency: 911</li>
        <li>Fire Department: 101</li>
        <li>Police: 100</li>
        <li>Ambulance: 108</li>
        <li>Disaster Management: 112</li>
      </ul>
    </div>
  );
};

const containerStyle = {
  fontFamily: `'Poppins', sans-serif`,
  textAlign: 'center',
  marginTop: '50px',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#0077B6',
  marginBottom: '20px',
};

const listStyle = {
  listStyleType: 'none',
  fontSize: '1.2rem',
  lineHeight: '2',
  color: '#333',
};

export default ImportantContacts;

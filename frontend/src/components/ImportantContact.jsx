import React from 'react';

const ImportantContacts = () => {
  const contacts = [
    { name: 'Emergency', number: '911' },
    { name: 'Fire Department', number: '101' },
    { name: 'Police', number: '100' },
    { name: 'Ambulance', number: '108' },
    { name: 'Disaster Management', number: '112' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-white">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 animate-bounce">Important Contacts</h1>
      <p className="text-lg text-gray-700 mb-4 text-center max-w-md">
        Here are some important contacts you might need during emergencies. Tap the call button to reach them directly.
      </p>
      <ul className="space-y-4">
        {contacts.map((contact) => (
          <li key={contact.number} className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
            <span className="text-xl font-semibold text-gray-800">{contact.name}</span>
            <div className="flex items-center">
              <span className="text-lg text-gray-600 mr-2">{contact.number}</span>
              <a
                href={`tel:${contact.number}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Call
              </a>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-500 mt-6">
        For any emergencies, always remember to stay calm and reach out to the appropriate services. Your safety is our priority!
      </p>
    </div>
  );
};

export default ImportantContacts;

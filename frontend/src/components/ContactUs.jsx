import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setStatus(result.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex">
        <div className="w-full md:w-1/2 bg-blue-600 text-white p-8 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-opacity-50 bg-gradient-to-br from-blue-700 to-blue-500"></div>
          <h2 className="text-4xl font-bold mb-4 z-10 relative">Contact Us</h2>
          <p className="text-lg mb-6 z-10 relative">
            We’re here to help you with any queries, support, or feedback. Reach out to us, and we’ll get back to you as soon as possible!
          </p>
          <div>
            <p className="mb-4 z-10 relative">
              <span className="font-semibold">Email:</span>{" "}
              support@alertbridge.com
            </p>
            <p className="mb-4 z-10 relative">
              <span className="font-semibold">Phone:</span> +1 (123) 456-7890
            </p>
            <p className="z-10 relative">
              <span className="font-semibold">Address:</span> PES University, Bangalore
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-100 transition duration-300 hover:bg-gray-200"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 border rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-100 transition duration-300 hover:bg-gray-200"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 border rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-100 transition duration-300 hover:bg-gray-200"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
            {status && (
              <div className="mt-4 text-center text-gray-700">
                <p>{status}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

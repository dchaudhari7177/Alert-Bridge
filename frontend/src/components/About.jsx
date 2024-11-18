import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center py-10 px-5">
      <section className="text-center mb-12 animate__animated animate__fadeIn">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-400 mb-4">
          Welcome to AlertBridge
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
          A disaster readiness and communication tool, bridging the gap for fast response times and real-time alerts.
        </p>
      </section>

      <section className="w-full max-w-4xl text-center mb-16 animate__animated animate__fadeIn animate__delay-1s">
        <h2 className="text-3xl font-semibold text-indigo-500 mb-6">Why Choose AlertBridge?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="bg-indigo-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold mb-3">Real-time Alerts</h3>
            <p className="text-gray-300">Instant updates on disasters happening around you. Stay informed and safe with our timely notifications.</p>
          </div>
          <div className="bg-indigo-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
            <p className="text-gray-300"> At AlertBridge, we prioritize your privacy. Your location and personal data are handled securely and used only to provide real-time alerts and better services.</p>
          </div>
          <div className="bg-indigo-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold mb-3">AI-powered Predictions</h3>
            <p className="text-gray-300">Using AI and real-time data, we assess the risks of natural disasters and provide timely predictions.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 w-full py-10 text-center mb-12 animate__animated animate__fadeIn animate__delay-2s">
        <h2 className="text-3xl font-semibold text-indigo-500 mb-8">Meet the Founders</h2>
        <div className="flex justify-center gap-10 flex-wrap">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-72 transform hover:scale-105 transition duration-300">
            <img className="w-32 h-32 mx-auto rounded-full mb-4" src="./dipak.jpg" alt="Founder 1" />
            <h3 className="text-xl font-semibold text-indigo-300 mb-2">Dipak Chaudhari</h3>
            <p className="text-gray-300">CEO & Co-Founder. I'm an adventurous tech enthusiast with a focus on web development and the exciting world of AI. Let's connect and dive into the possibilities!</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-72 transform hover:scale-105 transition duration-300">
            <img className="w-32 h-32 mx-auto rounded-full mb-4" src="./tejas.jpg" alt="Founder 2" />
            <h3 className="text-xl font-semibold text-indigo-300 mb-2">Tejas Nagmote</h3>
            <p className="text-gray-300">Inverstor & Co-Founder. Natural leader, skilled speaker, and fitness enthusiast. Motivated to inspire and drive success, both in the gym and in every project he takes on!</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-72 transform hover:scale-105 transition duration-300">
            <img className="w-32 h-32 mx-auto rounded-full mb-4" src="./vaibhav.jpg" alt="Founder 2" />
            <h3 className="text-xl font-semibold text-indigo-300 mb-2">Vaibhav Srivastava</h3>
            <p className="text-gray-300">President & Co-Founder. Curious student exploring new technologies, passionate about web development and AI, always eager to learn and grow!</p>
          </div>
          
        </div>
        
      </section>

      <section className="text-center mb-12 animate__animated animate__fadeIn animate__delay-3s">
        <h2 className="text-3xl font-semibold text-indigo-500 mb-6">Get in Touch</h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-6">
          Have any questions or want to learn more about AlertBridge? Reach out to us!
        </p>
        <button className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-semibold rounded-full transition duration-300">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default About;



import React, { useState } from "react";
// import { MdEmail } from "react-icons/md"; // removed, using inline SVG

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default browser submission
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    // reset form (optional)
    setFormData({ fullName: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-12 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
        {submitted ? (
          <div className="text-center text-green-600 font-medium mb-4">
            Thank you! Your message has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none hover:border-[#CFCFCF] focus:border-[#CFCFCF]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
                  <path fill="currentColor" d="M2 4h20v16H2V4zm2 2v1l8 5 8-5V6l-8 5-8-5z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=""
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none hover:border-[#CFCFCF] focus:border-[#CFCFCF]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none hover:border-[#CFCFCF] focus:border-[#CFCFCF]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none hover:border-[#CFCFCF] focus:border-[#CFCFCF]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#561361] text-white font-semibold py-2 rounded-md transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;

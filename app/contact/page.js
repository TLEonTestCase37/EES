"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    subject: "",
    message: "",
    affiliation: "",
    interests: "",
    department: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("Response submitted successfully");
      setFormData({
        name: "",
        email: "",
        role: "",
        subject: "",
        message: "",
        affiliation: "",
        interests: "",
        department: "",
        mobile: "",
      });
    } else {
      toast.error("Something went wrong. Please try again later");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-12"
      style={{ backgroundImage: `url("./Alumni_Background.png")` }}
    >
      <div className="bg-black/60 text-white p-10 rounded-xl shadow-2xl w-full max-w-2xl border border-white/20">
        <h1 className="text-4xl font-bold text-center text-amber-300 mb-2">
          CONTACT US
        </h1>
        <p className="text-center text-amber-100 mb-8">
          Have questions or need assistance? We are here to help!
        </p>

        {/* Contact Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Your email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Current Affiliation</label>
            <input
              type="text"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Your current affiliation"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Areas of Interest</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="AI, ML, Web Dev..."
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="CSE, ECE, etc."
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Mobile Number (optional)</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="e.g., +91 9876543210"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            >
              <option value="">Select Role</option>
              <option>Student</option>
              <option>Alumni</option>
              <option>Faculty</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            >
              <option value="">Select Subject</option>
              <option>General Query</option>
              <option>Technical Issue</option>
              <option>Feedback</option>
              <option>Others</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-amber-600 hover:bg-amber-700 rounded text-white font-semibold transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

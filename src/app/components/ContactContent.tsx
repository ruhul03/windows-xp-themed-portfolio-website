import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function ContactContent() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "your.email@example.com",
      color: "#0066CC",
      href: "mailto:your.email@example.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      color: "#5EAC24",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      color: "#D13438",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/yourusername",
      color: "#2B579A",
      href: "https://github.com/yourusername",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/yourusername",
      color: "#0078D7",
      href: "https://linkedin.com/in/yourusername",
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@yourusername",
      color: "#1E88E5",
      href: "https://twitter.com/yourusername",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#245EDC] via-[#3C8EEC] to-[#245EDC] p-6">
      <section className="max-w-4xl mx-auto space-y-4">
        {/* XP Window Header */}
        <div className="bg-gradient-to-b from-[#0054E3] via-[#0078D7] to-[#0054E3] rounded-t-lg border-t-2 border-l-2 border-white border-r-2 border-b border-[#003C74] shadow-lg">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-gradient-to-b from-red-400 to-red-600 border border-red-800 rounded-sm"></div>
              <div className="w-4 h-4 bg-gradient-to-b from-yellow-300 to-yellow-500 border border-yellow-700 rounded-sm"></div>
              <div className="w-4 h-4 bg-gradient-to-b from-green-400 to-green-600 border border-green-800 rounded-sm"></div>
            </div>
            <h2 className="text-white font-bold text-sm ml-2">Contact Information</h2>
          </div>
        </div>

        {/* XP Window Content */}
        <div className="bg-[#ECE9D8] rounded-b-lg border-2 border-t-0 border-[#0054E3] shadow-lg">
          <div className="p-6 space-y-5">
            
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#1F3F98] to-[#2B5BB5] p-4 rounded border-t-2 border-l-2 border-[#4A7AC9] border-r-2 border-b-2 border-[#0F2968] shadow-md">
              <h3 className="text-white font-bold text-xl drop-shadow">Get In Touch</h3>
              <p className="text-[#B9D7FF] text-sm mt-1">
                I'd love to hear from you! Feel free to reach out.
              </p>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white p-4 rounded border-2 border-t-[#DFDFDF] border-l-[#DFDFDF] border-r-[#9C9C9C] border-b-[#9C9C9C] shadow">
              <h4 className="text-[#0054E3] font-bold text-base mb-3 pb-2 border-b-2 border-[#316AC5]">
                📧 Contact Information
              </h4>
              
              <div className="space-y-2">
                {contactInfo.map(({ icon: Icon, label, value, color, href }) => {
                  const Wrapper = href ? "a" : "div";
                  
                  return (
                    <Wrapper
                      key={label}
                      href={href}
                      className="flex items-center gap-3 p-3 bg-gradient-to-b from-[#F7F6F0] to-[#ECE9D8] rounded border-t-2 border-l-2 border-white border-r-2 border-b-2 border-[#ACA899] hover:from-[#FFF7E6] hover:to-[#FFE8B8] transition-all cursor-pointer"
                    >
                      <div
                        className="w-10 h-10 rounded border-2 border-t-white border-l-white border-r-gray-600 border-b-gray-600 flex items-center justify-center text-white shrink-0 shadow-md"
                        style={{ 
                          background: `linear-gradient(to bottom, ${color}, ${color}dd)`
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#003C74] uppercase tracking-wide">
                          {label}
                        </div>
                        <div className="truncate text-sm text-gray-800 font-semibold">
                          {value}
                        </div>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-white p-4 rounded border-2 border-t-[#DFDFDF] border-l-[#DFDFDF] border-r-[#9C9C9C] border-b-[#9C9C9C] shadow">
              <h4 className="text-[#0054E3] font-bold text-base mb-3 pb-2 border-b-2 border-[#316AC5]">
                🌐 Social Media
              </h4>
              
              <div className="space-y-2">
                {socialLinks.map(({ icon: Icon, label, value, color, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gradient-to-b from-[#F7F6F0] to-[#ECE9D8] rounded border-t-2 border-l-2 border-white border-r-2 border-b-2 border-[#ACA899] hover:from-[#D6F0FF] hover:to-[#A8D8F0] transition-all cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded border-2 border-t-white border-l-white border-r-gray-600 border-b-gray-600 flex items-center justify-center text-white shrink-0 shadow-md"
                      style={{ 
                        background: `linear-gradient(to bottom, ${color}, ${color}dd)`
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#003C74] uppercase tracking-wide">
                        {label}
                      </div>
                      <div className="truncate text-sm text-gray-800 font-semibold">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✉️ Message sent successfully!\n\n(This is a demo - no actual message was sent)");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded border-2 border-t-[#DFDFDF] border-l-[#DFDFDF] border-r-[#9C9C9C] border-b-[#9C9C9C] shadow">
      <h4 className="text-[#0054E3] font-bold text-base mb-4 pb-2 border-b-2 border-[#316AC5]">
        ✉️ Send a Message
      </h4>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-[#003C74] mb-1 uppercase tracking-wide">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full px-3 py-2 bg-white border-2 border-t-[#7F9DB9] border-l-[#7F9DB9] border-r-[#D4D0C8] border-b-[#D4D0C8] rounded focus:border-t-[#0054E3] focus:border-l-[#0054E3] focus:border-r-[#316AC5] focus:border-b-[#316AC5] outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#003C74] mb-1 uppercase tracking-wide">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 bg-white border-2 border-t-[#7F9DB9] border-l-[#7F9DB9] border-r-[#D4D0C8] border-b-[#D4D0C8] rounded focus:border-t-[#0054E3] focus:border-l-[#0054E3] focus:border-r-[#316AC5] focus:border-b-[#316AC5] outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#003C74] mb-1 uppercase tracking-wide">
            Your Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows={4}
            required
            className="w-full px-3 py-2 bg-white border-2 border-t-[#7F9DB9] border-l-[#7F9DB9] border-r-[#D4D0C8] border-b-[#D4D0C8] rounded focus:border-t-[#0054E3] focus:border-l-[#0054E3] focus:border-r-[#316AC5] focus:border-b-[#316AC5] outline-none resize-none text-sm"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-4 py-3 bg-gradient-to-b from-[#ECE9D8] to-[#D4D0C8] text-gray-900 font-bold text-sm rounded border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] hover:from-[#FFF7E6] hover:to-[#ECE9D8] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white active:from-[#D4D0C8] active:to-[#ECE9D8] transition-all shadow-md"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
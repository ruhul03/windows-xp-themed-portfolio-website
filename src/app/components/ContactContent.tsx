import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export function ContactContent() {
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'your.email@example.com', color: '#E81123' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', color: '#2B882B' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA', color: '#0054E3' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', value: 'github.com/yourusername', color: '#333333' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/yourusername', color: '#0077B5' },
    { icon: Twitter, label: 'Twitter', value: '@yourusername', color: '#1DA1F2' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gradient-to-r from-[#0054E3] to-[#3F8CF3] text-white rounded">
        <h2 className="text-xl mb-1">Get In Touch</h2>
        <p className="text-blue-100 text-sm">Feel free to reach out!</p>
      </div>

      {/* Contact Information */}
      <div className="space-y-3">
        <h3 className="text-lg pb-2 border-b-2 border-[#0054E3]">Contact Information</h3>
        {contactInfo.map((contact, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-[#ECE9D8] border-2 border-[#ACACAC] rounded hover:bg-[#F5F3EB] transition-colors"
          >
            <div
              className="w-10 h-10 rounded flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: contact.color }}
            >
              <contact.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-600">{contact.label}</div>
              <div className="truncate">{contact.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <h3 className="text-lg pb-2 border-b-2 border-[#0054E3]">Social Media</h3>
        {socialLinks.map((social, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-white border-2 border-[#0054E3] rounded hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <div
              className="w-10 h-10 rounded flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: social.color }}
            >
              <social.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-600">{social.label}</div>
              <div className="text-sm truncate">{social.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-[#0054E3] rounded">
        <h3 className="mb-3">Send a Message</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-3 py-2 border-2 border-[#ACACAC] rounded focus:border-[#0054E3] outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-3 py-2 border-2 border-[#ACACAC] rounded focus:border-[#0054E3] outline-none"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full px-3 py-2 border-2 border-[#ACACAC] rounded focus:border-[#0054E3] outline-none resize-none"
          />
          <button
            className="w-full px-4 py-2 bg-gradient-to-b from-[#3F8CF3] to-[#0054E3] text-white rounded hover:brightness-110 transition-all border-2 border-[#0054E3]"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  LucideIcon,
} from "lucide-react";

type Item = {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  href?: string;
};

export function ContactContent() {
  const contactInfo: Item[] = [
    {
      icon: Mail,
      label: "Email",
      value: "your.email@example.com",
      color: "#E81123",
      href: "mailto:your.email@example.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      color: "#2B882B",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      color: "#0054E3",
    },
  ];

  const socialLinks: Item[] = [
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/yourusername",
      color: "#333333",
      href: "https://github.com/yourusername",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/yourusername",
      color: "#0077B5",
      href: "https://linkedin.com/in/yourusername",
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@yourusername",
      color: "#1DA1F2",
      href: "https://twitter.com/yourusername",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <header className="p-4 bg-gradient-to-r from-[#0054E3] to-[#3F8CF3] text-white rounded">
        <h2 className="text-xl mb-1 font-semibold">Get In Touch</h2>
        <p className="text-blue-100 text-sm">
          Feel free to reach out!
        </p>
      </header>

      <InfoSection title="Contact Information" items={contactInfo} />
      <InfoSection title="Social Media" items={socialLinks} external />

      <ContactForm />
    </section>
  );
}

/* ---------------- Components ---------------- */

function InfoSection({
  title,
  items,
  external = false,
}: {
  title: string;
  items: Item[];
  external?: boolean;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg pb-2 border-b-2 border-[#0054E3]">
        {title}
      </h3>

      {items.map(({ icon: Icon, label, value, color, href }) => {
        const Wrapper = href ? "a" : "div";

        return (
          <Wrapper
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 p-3 border-2 rounded transition-colors
                       bg-[#ECE9D8] border-[#ACACAC] hover:bg-[#F5F3EB]
                       focus:outline-none focus:ring-2 focus:ring-[#0054E3]"
          >
            <div
              className="w-10 h-10 rounded flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: color }}
            >
              <Icon className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-600">{label}</div>
              <div className="truncate text-sm">{value}</div>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}

function ContactForm() {
  return (
    <form
      className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-[#0054E3] rounded space-y-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <h3 className="mb-3 font-medium">Send a Message</h3>

      <input
        type="text"
        placeholder="Your Name"
        required
        className="w-full px-3 py-2 border-2 border-[#ACACAC] rounded focus:border-[#0054E3] outline-none"
      />

      <input
        type="email"
        placeholder="Your Email"
        required
        className="w-full px-3 py-2 border-2 border-[#ACACAC] rounded focus:border-[#0054E3] outline-none"
      />

      <textarea
        placeholder="Your Message"
        rows={4}
        required
        className="w-full px-3 py-2 border-2 border-[#ACACAC] rounded focus:border-[#0054E3] outline-none resize-none"
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-gradient-to-b from-[#3F8CF3] to-[#0054E3]
                   text-white rounded border-2 border-[#0054E3]
                   hover:brightness-110 transition-all"
      >
        Send Message
      </button>
    </form>
  );
}

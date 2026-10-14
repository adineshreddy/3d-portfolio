import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";
import { profile } from "../constants";
import "../styles/sections.css";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

const stripUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "");

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`,
  },
  {
    label: "LinkedIn",
    value: stripUrl(profile.linkedin),
    href: profile.linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: stripUrl(profile.github),
    href: profile.github,
    external: true,
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: profile.resume,
    download: true,
  },
];

const ContactForm = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setForm({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-7"
    >
      <div>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="What's your name?"
          required
        />
      </div>

      <div>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="What's your email address?"
          required
        />
      </div>

      <div>
        <label htmlFor="message">Your Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="How can I help you?"
          rows="5"
          required
        />
      </div>

      <div aria-live="polite">
        {status === "success" && (
          <p className="form-status success">
            Thanks! Your message was sent. I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="form-status error">
            Something went wrong sending your message. Please email me
            directly at {profile.email}.
          </p>
        )}
      </div>

      <button type="submit" disabled={loading}>
        <div className="cta-button group">
          <div className="bg-circle" />
          <p className="text">{loading ? "Sending..." : "Send Message"}</p>
          <div className="arrow-wrapper">
            <img src="/images/arrow-down.svg" alt="" />
          </div>
        </div>
      </button>
    </form>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch"
          sub="Backend, systems, and distributed infrastructure"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="card-border contact-panel">
              <p className="contact-availability">
                Open to <strong>full-time Software Engineering roles</strong>{" "}
                starting 2027. The fastest way to reach me is email.
              </p>

              <ul className="contact-list">
                {contactLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="contact-item"
                      {...(link.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      {...(link.download && { download: "" })}
                    >
                      <span className="contact-item-label">{link.label}</span>
                      <span className="contact-item-value">{link.value}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {EMAILJS_SERVICE_ID && (
                <>
                  <div className="contact-form-divider" />
                  <ContactForm />
                </>
              )}
            </div>
          </div>
          <div className="xl:col-span-7 contact-3d">
            <div className="bg-[#cd7c2e] w-full h-full min-h-96 hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

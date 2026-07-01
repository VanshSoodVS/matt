import { useState } from "react";

const EMAIL = "matthew@matthewwillman.co.za";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Website enquiry from ${data.get("name") || "visitor"}`);
    const body = encodeURIComponent(
      `${data.get("message") || ""}\n\nFrom: ${data.get("name") || ""} (${data.get("email") || ""})`
    );
    // Open the visitor's mail client addressed to Matthew.
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="page">
      <div className="container contact">
        <h1 className="page__title">Contact Us</h1>

        <p className="contact__email">
          Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required />
          </div>
          <button type="submit">Send Us a Message</button>
          {sent && (
            <p className="contact__note">
              Thank you — your email client should now open with your message.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

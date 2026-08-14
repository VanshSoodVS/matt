import { useState } from "react";

// A visible, copy-able email address as a direct fallback for anyone who would
// rather email us — no mail app required, they can paste it into any webmail.
export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for non-secure contexts / older browsers.
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (rare) — the visible address can still be selected.
    }
  };

  return (
    <p className="landing-directemail">
      Have a question about your pre-order? Email us directly:
      <br />
      <a href={`mailto:${email}`}>{email}</a>
      <button type="button" className="landing-copybtn" onClick={copy}>
        {copied ? "Copied!" : "Copy email address"}
      </button>
    </p>
  );
}

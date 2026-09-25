import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'
import { submitContact, saveUser } from '../../api.js'
import { getBrowserId } from "../../utils/userId.js"
import { getAnonymousId } from "../../utils/session.js"

const EMPTY_FORM = { name: '', email: '', message: '', website: '' } 

export default function Contact() {
  useDocumentTitle('Contact')

  const [ids, setIds] = useState({ userId: '', anonymousId: '' })
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // ===========================================
  useEffect(() => {
    const initialize = async () => {
      try {
        const browserId = getBrowserId();
        const anonymousId = getAnonymousId();
        const res = await saveUser(browserId);
        setIds({ userId: res.data.userId, anonymousId });

        if (res.data.latestName || res.data.latestEmail) {
          setForm((prev) => ({
            ...prev,
            name: res.data.latestName || prev.name,
            email: res.data.latestEmail || prev.email,
          }));
        }
      } catch (err) {
        // Non-fatal: the contact form still works without a userId attached.
        console.log("Visitor id lookup failed:", err.message);
      }
    };
    initialize();
  }, []);
  // ===========================================

  const handleInput = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.website) return; 

    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        userId: ids.userId || null,
        anonymousId: ids.anonymousId || null,
      });

      if (res.data?.success) {
        toast.success("Message sent! I'll get back to you soon.");
        setForm(EMPTY_FORM);
      } else {
        toast.error(res.data?.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      const serverMessage = err.response?.data?.message;
      if (err.response?.status === 429) {
        toast.error("You're sending messages too fast. Please try again in a bit.");
      } else {
        toast.error(serverMessage || "Couldn't send your message. Please try again later.");
      }
      console.log("Contact submit error:", err.message);
    } finally {
      setSubmitting(false);
    }
  };
  //=========================================================

  return (
    <>
      <div className="eyebrow reveal">Contact</div>
      <h1 className="reveal">Contact</h1>

      <div className="contact-grid reveal" style={{ marginTop: 20 }}>
        <div className="panel panel-pad">
          <h3>Reach me directly</h3>
          <div className="contact-row">
            <i className="fa-solid fa-envelope"></i>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Email</div>
              <a href="mailto:23.rajeevranjan.23@gmail.com">23.rajeevranjan.23@gmail.com</a>
            </div>
          </div>
          <div className="contact-row">
            <i className="fa-solid fa-phone"></i>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Phone</div>
              <a href="tel:+919155XXXXXX">+91 9155XXXXXX</a>
            </div>
          </div>
          <div className="contact-row">
            <i className="fa-brands fa-linkedin-in"></i>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>LinkedIn</div>
              <a href="https://www.linkedin.com/in/rajeevranjan023" target="_blank" rel="noopener noreferrer">
                LinkedIn Profile
              </a>
            </div>
          </div>
          <div className="contact-row">
            <i className="fa-brands fa-github"></i>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>GitHub</div>
              <a href="https://github.com/rajeevranjan-023" target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
            </div>
          </div>
        </div>

        <div className="panel panel-pad">
          <h3>Send a message</h3>

          {/* ========================================= */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleInput}
                required
              />
              {errors.name && <div className="field-error" style={{ color: '#e5484d', fontSize: 12 }}>{errors.name}</div>}
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleInput}
                required
              />
              {errors.email && <div className="field-error" style={{ color: '#e5484d', fontSize: 12 }}>{errors.email}</div>}
            </div>
            <div className="form-field">
              <label>Message</label>
              <textarea
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={handleInput}
                required
              ></textarea>
              {errors.message && <div className="field-error" style={{ color: '#e5484d', fontSize: 12 }}>{errors.message}</div>}
            </div>

            <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={handleInput}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <i className="fa-solid fa-paper-plane"></i> {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

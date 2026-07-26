import { useState, useCallback } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'

export default function Contact() {
  useDocumentTitle('Contact')

  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  return (
    <>
      <div className="eyebrow reveal">Open Channel</div>
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
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                Add your profile URL
              </a>
            </div>
          </div>
          <div className="contact-row">
            <i className="fa-brands fa-github"></i>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>GitHub</div>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                Add your profile URL
              </a>
            </div>
          </div>
        </div>

        <div className="panel panel-pad">
          <h3>Send a message</h3>
          <form action="mailto:23.rajeevranjan.23@gmail.com" method="post" encType="text/plain">
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Message</label>
              <textarea
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              <i className="fa-solid fa-paper-plane"></i> Send Message
            </button>
          </form>
          <p style={{ fontSize: 12, marginTop: 10 }}>
            This opens your email client — there's no backend attached yet.
          </p>
        </div>
      </div>
    </>
  )
}

import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { sendMessage } from '../api.js';
import { profile } from '../data/content.js';

// `website` is a honeypot: it's hidden from real users, so only bots fill it.
const EMPTY = { name: '', email: '', subject: '', message: '', website: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', msg: '' });
    try {
      const res = await sendMessage(form);
      setStatus({ state: 'ok', msg: res.message || 'Thanks! I’ll get back to you soon.' });
      setForm(EMPTY);
    } catch (err) {
      setStatus({ state: 'err', msg: err.message || 'Something went wrong.' });
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Contact</span>
          <h2 className="section-title">Let’s Work Together</h2>
          <p className="section-sub">
            Have a role, project or just want to say hi? Drop me a message.
          </p>
        </Reveal>

        <Reveal className="contact-wrap">
          <div className="contact-info">
            <h3>Let’s connect 👋</h3>
            <p>I’m open to internships, full-time roles and interesting collaborations.</p>

            <div className="contact-detail">
              <span className="ic">@</span>
              <div>
                <div className="label">Email</div>
                <a className="value" href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>
            <div className="contact-detail">
              <span className="ic">📍</span>
              <div>
                <div className="label">Location</div>
                <div className="value">{profile.location}</div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" value={form.name} onChange={onChange}
                  placeholder="Your name" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={onChange}
                  placeholder="you@example.com" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" value={form.subject} onChange={onChange}
                placeholder="What’s this about?" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={onChange}
                placeholder="Write your message…" required />
            </div>

            {/* Honeypot — hidden from humans; bots that fill it get silently rejected. */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={onChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />

            <button className="btn btn-primary" type="submit" disabled={status.state === 'loading'}>
              {status.state === 'loading' ? 'Sending…' : 'Send Message →'}
            </button>

            {status.state === 'ok' && <div className="form-note ok">✅ {status.msg}</div>}
            {status.state === 'err' && <div className="form-note err">⚠ {status.msg}</div>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

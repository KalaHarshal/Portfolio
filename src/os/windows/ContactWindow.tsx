import { useState } from 'react';
import { Send, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { contactInfo, socialLinks } from '../data';

export const ContactWindow = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:kalaharshal03@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex flex-col md:flex-row h-full text-sm">
      <form onSubmit={handleSubmit} className="flex-1 p-5 space-y-3 overflow-y-auto">
        <div>
          <label className="text-[11px] text-muted-foreground">To</label>
          <p className="text-xs px-2 py-1.5 rounded bg-muted/40 mt-1">kalaharshal03@gmail.com</p>
        </div>
        <input
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full text-xs px-2 py-2 rounded bg-muted/40 border border-border/40 focus:outline-none focus:border-primary"
        />
        <input
          required
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full text-xs px-2 py-2 rounded bg-muted/40 border border-border/40 focus:outline-none focus:border-primary"
        />
        <textarea
          required
          rows={5}
          placeholder="Message..."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full text-xs px-2 py-2 rounded bg-muted/40 border border-border/40 focus:outline-none focus:border-primary resize-none"
        />
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-2 rounded bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-medium"
        >
          Send <Send className="w-3 h-3" />
        </button>
      </form>

      <div className="w-full md:w-48 shrink-0 border-t md:border-t-0 md:border-l border-border/40 p-4 space-y-4 overflow-y-auto">
        {contactInfo.map((c) => (
          <a key={c.label} href={c.href} className="flex items-start gap-2 group">
            {c.label === 'Email' && <Mail className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />}
            {c.label === 'Location' && <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />}
            {c.label === 'Phone' && <Phone className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />}
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground">{c.label}</p>
              <p className="text-[11px] group-hover:text-primary truncate">{c.value}</p>
            </div>
          </a>
        ))}
        <div className="flex gap-2 pt-2">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:text-primary"
              aria-label={s.label}
            >
              {s.label === 'GitHub' ? <Github className="w-4 h-4" /> : <Linkedin className="w-4 h-4" />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

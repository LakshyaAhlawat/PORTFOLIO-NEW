// contactService.js
// Sends contact form data to the backend API

export async function sendContactForm({ name, email, message }) {
  try {
    // Try to split name into first/last for backend compatibility
    let firstName = '';
    let lastName = '';
    if (name) {
      const parts = String(name).trim().split(/\s+/);
      firstName = parts.shift() || '';
      lastName = parts.join(' ') || '';
    }

    const payload = { name, firstName, lastName, email, message };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const err = new Error(body?.message || 'Failed to send message');
      err.response = body;
      throw err;
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
}

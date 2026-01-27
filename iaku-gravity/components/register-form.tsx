
"use client";

import { useState } from 'react';

export function RegisterForm({ isAdmin }: { isAdmin: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    graduationYear: '',
    whatsapp: '',
    company: '',
    position: '',
    sector: '',
    city: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/alumni/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setMessage('Alumni registered successfully!');
        setFormData({ name: '', graduationYear: '', whatsapp: '', company: '', position: '', sector: '', city: '' });
      } else {
        const d = await res.json();
        setMessage(d.error || 'Failed to register');
      }
    } catch (err) {
      setMessage('Error submitting form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" required />
      <input name="graduationYear" type="number" value={formData.graduationYear} onChange={handleChange} placeholder="Graduation Year (e.g. 2010)" className="border p-2 rounded" required />
      <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="Whatsapp (e.g. 0812...)" className="border p-2 rounded" required />
      <input name="company" value={formData.company} onChange={handleChange} placeholder="Company (Optional)" className="border p-2 rounded" />
      <input name="position" value={formData.position} onChange={handleChange} placeholder="Position (Optional)" className="border p-2 rounded" />
      <input name="sector" value={formData.sector} onChange={handleChange} placeholder="Sector (Optional)" className="border p-2 rounded" />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City (Optional)" className="border p-2 rounded" />

      <button type="submit" className="md:col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Register Alumni
      </button>
      {message && <p className="md:col-span-2 text-center text-sm font-bold">{message}</p>}
    </form>
  );
}

import React, { useState } from 'react';
import { Gift, FileText, Monitor, Box, Check } from 'lucide-react';

const PARCEL_CATEGORIES = [
  { key: 'Gifts', label: 'Gifts', icon: Gift },
  { key: 'Documents', label: 'Documents', icon: FileText },
  { key: 'Electronics', label: 'Electronics', icon: Monitor },
  { key: 'Package', label: 'Package', icon: Box },
];

const STEPS = [
  { key: 1, label: 'Category' },
  { key: 2, label: 'Info' },
  { key: 3, label: 'Summary' },
];

const ParcelPage = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ senderName: '', senderPhone: '', receiverName: '', receiverPhone: '', item: '' });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleConfirm = () => {
    setStep(3);
  };

  return (
    <div className="page">
      {/* Step indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, padding: 16, background: '#fff', borderBottom: '1px solid var(--border)' }}>
        {STEPS.map(s => (
          <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: step === s.key ? 700 : 400, color: step === s.key ? 'var(--primary)' : 'var(--text-light)', fontSize: 14 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: step === s.key ? 'var(--primary)' : 'var(--border)', color: step === s.key ? '#fff' : 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{step > s.key ? <Check size={14} /> : s.key}</span>
            {s.label}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ padding: 16 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 8 }}>Bringing Happiness From Door To Door</h2>
          <p style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 16 }}>Choose a category for your parcel</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {PARCEL_CATEGORIES.map(c => (
              <button key={c.key} onClick={() => { update('item', c.key); setStep(2); }} style={{ padding: 24, background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
                <c.icon size={32} color="var(--primary)" />
                <div style={{ marginTop: 8, fontWeight: 600, fontSize: 14 }}>{c.label}</div>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 24, background: 'var(--primary-light)', borderRadius: 'var(--radius)', padding: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Why Choose Yalla Parcel?</div>
            <div style={{ fontSize: 13, color: 'var(--text-light)' }}>Product Safety &middot; Faster Delivery &middot; 24/7 Support</div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ padding: 16 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Sender Information</h3>
          <div className="field" style={{ marginBottom: 10 }}>
            <input placeholder="Sender Name" value={form.senderName} onChange={e => update('senderName', e.target.value)} />
          </div>
          <div className="field" style={{ marginBottom: 10 }}>
            <input placeholder="Sender Phone" value={form.senderPhone} onChange={e => update('senderPhone', e.target.value)} />
          </div>
          <h3 style={{ fontWeight: 700, margin: '16px 0 12px' }}>Receiver Information</h3>
          <div className="field" style={{ marginBottom: 10 }}>
            <input placeholder="Receiver Name" value={form.receiverName} onChange={e => update('receiverName', e.target.value)} />
          </div>
          <div className="field" style={{ marginBottom: 10 }}>
            <input placeholder="Receiver Phone" value={form.receiverPhone} onChange={e => update('receiverPhone', e.target.value)} />
          </div>
          <button onClick={handleConfirm} style={{ marginTop: 16, width: '100%', padding: 14, background: 'var(--primary)', color: '#fff', borderRadius: 24, fontWeight: 700 }}>Continue</button>
        </div>
      )}

      {step === 3 && (
        <div style={{ padding: 16 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Parcel Request Summary</h3>
          <div style={{ background: '#fff', borderRadius: 'var(--radius)', padding: 16, boxShadow: 'var(--shadow)' }}>
            <div className="summary-row"><span>Sender</span><span>{form.senderName}</span></div>
            <div className="summary-row"><span>Receiver</span><span>{form.receiverName}</span></div>
            <div className="summary-row"><span>Distance</span><span>5.2 km</span></div>
            <div className="summary-row"><span>Delivery Fee</span><span>$3.99</span></div>
            <div className="summary-row"><span>Tips</span><span>$0.00</span></div>
            <div className="summary-row"><span>Charge Pay By</span><span>Sender</span></div>
            <div className="summary-row total"><span>Total</span><span style={{ color: 'var(--primary)' }}>$3.99</span></div>
          </div>
          <button style={{ marginTop: 16, width: '100%', padding: 14, background: 'var(--primary)', color: '#fff', borderRadius: 24, fontWeight: 700 }}>Confirm Order</button>
        </div>
      )}
    </div>
  );
};

export default ParcelPage;
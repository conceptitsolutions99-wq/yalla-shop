import React from 'react';
import { CheckCircle } from 'lucide-react';

const Toast = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="toast-container">
      <div className="toast">
        <CheckCircle size={14} /> {message}
      </div>
    </div>
  );
};

export default Toast;
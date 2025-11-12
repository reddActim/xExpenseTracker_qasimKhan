// Modal.jsx
import React, { useEffect } from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, children }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // stops clicks inside modal from closing it
      >
        <button onClick={onClose} className="modal-close">X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

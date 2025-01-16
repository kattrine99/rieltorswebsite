import React from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  message: string; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()} 
      >
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Успех!</h2>
        <p>{message}</p>
        <button className="ok-button" onClick={onClose}>
            ОК
        </button>
      </div>
    </div>
  );
};

export default Modal;


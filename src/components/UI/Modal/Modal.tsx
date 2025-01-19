import React from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  message: string; 
  type?: "success" | "error";
  title?: string; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, type = "success", title }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${type}`} 
        onClick={(event) => event.stopPropagation()} 
      >
        <h2>{title || (type === "success" ? "Успех!" : "Ошибка")}</h2> 
        <p>{message}</p>
        <button className="ok-button" onClick={onClose}>
          ОК
        </button>
      </div>
    </div>
  );
};

export default Modal;



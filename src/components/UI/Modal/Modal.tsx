import React from "react";
import "./Modal.scss";
import { Button, Heading } from "../../index";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: "success" | "error";
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, type = "success", title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${type}`}
        onClick={(event) => event.stopPropagation()}
      >
        <Heading text={title || (type === "success" ? "Успех!" : "Ошибка")} level={2} className={""} />
        <p>{message}</p>
        <Button className={"ok-button"} onClick={onClose}>ОК</Button>
      </div>
    </div>
  );
};



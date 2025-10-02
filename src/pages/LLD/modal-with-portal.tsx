import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">React Portal Modal Example</h1>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Open Modal
      </button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <h2 className="text-lg font-semibold mb-2">Hello from Modal 👋</h2>
          <p>This modal is rendered using React Portal.</p>
        </Modal>
      )}
    </div>
  );
}

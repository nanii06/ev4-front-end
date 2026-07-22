"use client";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({ isOpen, onConfirm, onCancel }: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.6)", display: "flex",
      alignItems: "center", justifyContent: "center"
    }}>
      <div style={{ background: "#222", padding: 24, borderRadius: 8 }}>
        <p>¿Seguro que quieres eliminar este recurso?</p>
        <button onClick={onConfirm}>Sí, eliminar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}
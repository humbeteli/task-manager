import "./ConfirmModal.css";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>

        <div className="modal-buttons">
          <button className="modal-cancel" onClick={onCancel}>
            Ləğv et
          </button>
          <button className="modal-confirm" onClick={onConfirm}>
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
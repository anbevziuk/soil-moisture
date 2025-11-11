import classes from "./main.module.css";

export function Modal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <p dangerouslySetInnerHTML={{ __html: message }} />
        <button onClick={onClose} className={classes.closeBtn}>
          Закрити
        </button>
      </div>
    </div>
  );
}

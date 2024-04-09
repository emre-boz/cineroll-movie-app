import ReactDOM from 'react-dom';

function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      {children}
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./Modal.css"; // CSS file for styling

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay w-full">
      <div className="modal md:w-[50%] w-[90%]">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;

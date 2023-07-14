import React, { useState, useEffect } from "react";

const FormPopup = ({ onClose }) => {
  const [showPopup, setShowPopup] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`popup ${showPopup ? "show" : ""}`}>
      <div className="popup-content">
        <h3>To-do Created Successfully</h3>
      </div>
    </div>
  );
};

export default FormPopup;

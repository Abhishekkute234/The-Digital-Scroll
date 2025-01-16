import React, { useEffect, useState } from "react";

type SuccessMessageProps = {
  message: string;
  duration?: number; // Duration in milliseconds
  onClose?: () => void; // Callback when the message disappears
};

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Show the message
    const timer = setTimeout(() => {
      setVisible(false); // Hide the message
      if (onClose) onClose(); // Trigger the callback if provided
    }, duration);

    return () => clearTimeout(timer); // Cleanup the timeout
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-transform duration-500 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } p-4 bg-green-500 text-white rounded-lg shadow-lg`}
    >
      {message}
    </div>
  );
};

export default SuccessMessage;

import { useState, useEffect } from 'react';

const Notification = ({ message, onClose, bgColor }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Kapatma fonksiyonu
    }, 3000); // 5 saniye sonra kaybolacak

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 p-4 m-4 ${bgColor}  text-white rounded shadow-lg transition-opacity ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;

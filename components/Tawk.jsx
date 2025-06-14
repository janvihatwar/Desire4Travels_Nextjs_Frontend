import React, { useEffect } from 'react';
import styles from './Tawk.module.css';

const Tawk = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;

    script.src = 'https://embed.tawk.to/5c59ccd27cf662208c942f18/1djj7vfs3';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    document.body.appendChild(script);

    script.onerror = () => {
      console.error('Failed to load Tawk.to script.');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles['tawk-custom-container']} aria-hidden="true" />
  );
};

export default Tawk;

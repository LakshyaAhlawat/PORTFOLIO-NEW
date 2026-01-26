import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from './spinner.jsx';

const MIN_SPINNER_TIME = 700; // ms

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(20, 20, 20, 0.7)',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.3s',
};

export default function RouteChangeSpinner() {
  const location = useLocation();
  const [showSpinner, setShowSpinner] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setShowSpinner(true);
    if (timer) clearTimeout(timer);
    const t = setTimeout(() => setShowSpinner(false), MIN_SPINNER_TIME);
    setTimer(t);
    // Hide spinner after MIN_SPINNER_TIME
    return () => clearTimeout(t);
  }, [location]);

  return showSpinner ? (
    <div style={overlayStyle}>
      <div>
        <Spinner />
        <div style={{textAlign:'center',marginTop:'1.5rem',fontSize:'1.2rem',color:'#fff',letterSpacing:'2px',fontWeight:'bold',textShadow:'0 2px 8px #000'}}>Loading...</div>
      </div>
    </div>
  ) : null;
}

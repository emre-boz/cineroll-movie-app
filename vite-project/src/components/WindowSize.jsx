import { useState, useEffect } from 'react';

const WindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize()
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      
      <div style={{ position: 'fixed', top: "0", left: "0", zIndex: 1000000, color:"red" }}>
        {windowSize.width} x {windowSize.height}
      </div>
    </>
  );
};

export default WindowSize;

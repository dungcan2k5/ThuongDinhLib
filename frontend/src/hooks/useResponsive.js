import { useState, useEffect } from 'react';

export default function useResponsive() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 768px là breakpoint phổ biến

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design
 * @returns {boolean} Returns true if viewport width is 768px or less
 * 
 * Usage:
 * const isMobile = useResponsive();
 * if (isMobile) {
 *   // render mobile layout
 * }
 */
export default function useResponsive() {
  // Initialize state with current viewport width
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount

  return isMobile;
}

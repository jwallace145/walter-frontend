import { useEffect, useState } from 'react';

const MOBILE_MAXIMUM_DEVICE_WIDTH: number = 768;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect((): (() => void) => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_MAXIMUM_DEVICE_WIDTH);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;

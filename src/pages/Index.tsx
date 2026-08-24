import { useEffect, useState } from 'react';
import { DesktopOS } from '@/os/DesktopOS';
import Classic from './Classic';

const MIN_DESKTOP_WIDTH = 860;

const getIsWide = () =>
  typeof window !== 'undefined' ? window.matchMedia(`(min-width: ${MIN_DESKTOP_WIDTH}px)`).matches : true;

/**
 * On wide viewports we render the interactive macOS-style desktop.
 * On phones/small tablets, dragging floating windows is a poor experience,
 * so we fall back to the original single-page scrolling layout.
 */
const Index = () => {
  const [isWide, setIsWide] = useState(getIsWide);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MIN_DESKTOP_WIDTH}px)`);
    const update = () => setIsWide(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isWide ? <DesktopOS /> : <Classic />;
};

export default Index;

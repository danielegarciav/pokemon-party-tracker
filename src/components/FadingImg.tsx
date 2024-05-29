import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import css from './FadingImg.module.css';

export const FadingImg = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef<HTMLImageElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const onLoad = () => setIsLoading(false);
    element.addEventListener('load', onLoad);
    return () => element.removeEventListener('load', onLoad);
  }, []);
  return <img ref={ref} src={src} alt={alt} className={clsx(css.fadingImg, isLoading && css.isLoading)} />;
};

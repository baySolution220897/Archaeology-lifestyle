import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  id?: string;
  as?: 'div' | 'section' | 'article' | 'aside';
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 800,
  direction = 'up',
  threshold = 0.12,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
  id,
  as: Component = 'div',
}) => {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const getDirectionClasses = () => {
    if (isVisible) {
      return 'opacity-100 translate-x-0 translate-y-0';
    }

    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-8';
      case 'down':
        return 'opacity-0 -translate-y-8';
      case 'left':
        return 'opacity-0 translate-x-8';
      case 'right':
        return 'opacity-0 -translate-x-8';
      case 'none':
      default:
        return 'opacity-0';
    }
  };

  return (
    <Component
      ref={ref}
      id={id}
      className={`will-change-[opacity,transform] transition-[opacity,transform] ease-out ${getDirectionClasses()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Component>
  );
};

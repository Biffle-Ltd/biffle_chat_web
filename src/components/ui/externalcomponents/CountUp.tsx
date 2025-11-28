import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  separator?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
}

const CountUp: React.FC<CountUpProps> = ({
  from = 0,
  to,
  duration = 2,
  separator = '',
  className = '',
  prefix = '',
  suffix = ''
}) => {
  const [count, setCount] = useState(from);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = from;
    const endValue = to;
    const totalDuration = duration * 1000; // Convert to milliseconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      
      // Check if the target value has decimals
      const hasDecimals = to % 1 !== 0;
      if (hasDecimals) {
        setCount(Math.round(currentValue * 10) / 10); // Round to 1 decimal place
      } else {
        setCount(Math.round(currentValue));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, from, to, duration]);

  const formatNumber = (num: number): string => {
    // Check if the target value has decimals
    const hasDecimals = to % 1 !== 0;
    
    if (hasDecimals) {
      // For decimal values, show appropriate decimal places
      const decimalPlaces = to.toString().split('.')[1]?.length || 1;
      return num.toFixed(decimalPlaces);
    }
    
    if (separator) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  const displayValue = () => {
    return `${prefix}${formatNumber(count)}${suffix}`;
  };

  return (
    <span ref={countRef} className={className}>
      {displayValue()}
    </span>
  );
};

export default CountUp;

import { useState, useEffect, useRef } from "react";

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Store the current ref value in a local variable
    const currentElement = elementRef.current;

    // Create the observer instance
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
    }, options);

    // Observe the element if it exists
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup observer when component unmounts or options change
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  // Return the ref and the intersection state
  return [elementRef, isIntersecting];
};

export default useIntersectionObserver;

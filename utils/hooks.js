import { useState, useEffect, useRef } from "react";

/**
 * Custom hook that uses the Intersection Observer API to determine if an element is in the viewport.
 *
 * @param {Object} [options={}] - Intersection Observer options.
 * @param {string} [options.root=null] - The element that is used as the viewport for checking visibility of the target.
 * @param {string} [options.rootMargin='0px'] - Margin around the root.
 * @param {number} [options.threshold=0] - Number between 0 and 1 indicating the percentage of the target's visibility the observer's callback should be executed.
 * @returns {[React.RefObject, boolean]} - Returns a ref to be attached to the element to be observed and a boolean indicating if the element is intersecting.
 */
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

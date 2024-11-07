'use client';

import { useEffect, useState } from 'react';

import { getGreeting } from '@/utils/getGreeting';

export const Greet = () => {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getGreeting());
    };

    const now = new Date();
    const timeToNextMinute =
      60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

    updateGreeting();

    const intervalId = setInterval(updateGreeting, 60000);
    const timeoutId = setTimeout(() => {
      updateGreeting();
      intervalId;
    }, timeToNextMinute);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <span className="mr-3">{greeting}</span>
    </>
  );
};

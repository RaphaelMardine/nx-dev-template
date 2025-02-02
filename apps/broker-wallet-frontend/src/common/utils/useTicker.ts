'use client';

import { intervalToDuration, isBefore } from 'date-fns';
import { useEffect, useState } from 'react';

export const useTicker = (futureDate: Date) => {
  const [now, setNow] = useState(new Date());
  const isTimeUp = isBefore(futureDate, now);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [setNow]);

  if (isTimeUp) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true };
  }

  const { days, hours, minutes, seconds } = intervalToDuration({
    start: now,
    end: futureDate,
  });

  return {
    days,
    hours,
    minutes,
    seconds,
    isTimeUp,
  };
};

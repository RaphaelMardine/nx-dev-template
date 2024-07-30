'use client';

import { newDateTimezoneSP } from '@v4company/utils';
import { intervalToDuration, isBefore } from 'date-fns';
import { useEffect, useState } from 'react';

export const useTicker = (futureDate: Date = newDateTimezoneSP()) => {
  const [now, setNow] = useState(newDateTimezoneSP());
  const isTimeUp = isBefore(futureDate, now);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(newDateTimezoneSP());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [setNow]);

  if (isTimeUp) {
    return { hours: 0, minutes: 0, seconds: 0, isTimeUp: true };
  }

  const {
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = intervalToDuration({
    start: now,
    end: futureDate,
  });

  return {
    hours,
    minutes,
    seconds,
    isTimeUp,
  };
};

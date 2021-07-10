import { useEffect, useState } from 'react';
import Bar from './Bar';

export default function RandomBar ({ heightInterval, colorInterval, upDown, style }) {
  const [percent, setPercent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [backgroundColor, setBackgroundColor] =
    useState(
      `rgb(${
        Math.round(Math.random() * 255)
      },${
        Math.round(Math.random() * 255)
      },${
        Math.round(Math.random() * 255)
      })`
    );

  useEffect(() => {
    const typeFunctions = {
      random: () => setPercent(Math.round(Math.random() * 100)),
      upDown: () => setPercent(p => {
        if (direction && p < 100) return p + 2;
        if (direction && p === 100) return setDirection(0) ?? 98;
        if (!direction && p > 0) return p - 2;
        if (!direction && p === 0) return setDirection(1) ?? 2;
      })
    };
    const int = setInterval(() => {
      upDown && typeFunctions.upDown();
      upDown ?? typeFunctions.random();
    }, heightInterval ?? 250);
    return () => clearInterval(int);
  }, [direction, heightInterval, upDown]);

  useEffect(() => {
    const int = setInterval(() => {
      setBackgroundColor(`rgb(${
        Math.round(Math.random() * 255)
      },${
        Math.round(Math.random() * 255)
      },${
        Math.round(Math.random() * 255)
      })`);
    }, colorInterval ?? 250);
    return () => clearInterval(int);
  }, [colorInterval]);

  return (
    <Bar
      style={{
        ...style,
        backgroundColor,
        transition: `height ${heightInterval / 1000}s`
      }} percent={percent}
    />
  );
}

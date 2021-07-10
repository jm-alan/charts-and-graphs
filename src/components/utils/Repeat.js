import { cloneElement } from 'react';

export default function Repeat ({ times, children, iterateLabel, iterateStep, reverse }) {
  if (!Array.isArray(children)) children = [children];
  const keyAwareDeepClone = (El, idx) => El && cloneElement(
    El,
    {
      ...El.props,
      key: idx
    },
    El.children && El.children.length && El.children.map(keyAwareDeepClone)
  );

  const multiplyElement = el => (new Array(times)).fillByGenerator(idx => keyAwareDeepClone(el, idx));

  const labelElement = (el, idx) => (
    <RepeatLabel
      key={idx}
      label={iterateLabel && idx * iterateStep}
    >
      {el}
    </RepeatLabel>
  );

  children.mapInPlace(multiplyElement);

  children.mapInPlace(multipliedChild => multipliedChild.map(labelElement));

  if (reverse) children.mapInPlace(multipliedChild => multipliedChild.reverse());

  return children;
}

function RepeatLabel ({ children, label }) {
  return (
    <div className='repeat-label'>
      {label}
      {children}
    </div>
  );
}

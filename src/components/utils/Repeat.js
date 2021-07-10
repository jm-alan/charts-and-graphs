import { cloneElement } from 'react';

export default function Repeat ({ times, children }) {
  if (!Array.isArray(children)) children = [children];
  const keyAwareDeepClone = (El, idx) => cloneElement(
    El,
    { ...El.props, key: idx },
    El.children && El.children.length && El.children.map(keyAwareDeepClone)
  );

  const multiplyElement = el => (new Array(times)).fillByGenerator(idx => keyAwareDeepClone(el, idx));

  return children.map(multiplyElement);
}

import { cloneElement } from 'react';
import Repeat from '../utils/Repeat';

import './index.css';

export default function BarChart ({ scaleMax, scaleStep, children }) {
  if (!Array.isArray(children)) children = [children];
  children = children.map((child, idx) => {
    return cloneElement(
      child,
      {
        ...child.props,
        style: {
          width: `${(100 / children.length) - 1}%`
        },
        key: idx
      },
      child.children
    );
  });

  return (
    <div className='bar-box'>
      <div className='bar-scale-container'>
        <Repeat
          iterateLabel
          reverse
          times={Math.round(((scaleMax / scaleStep) * 100 + Number.EPSILON) / 100) + 1}
          iterateStep={scaleStep}
        >
          <div className='bar-scale' />
        </Repeat>
      </div>
      <div className='bar-container'>
        {children}
      </div>
    </div>
  );
}

import Repeat from '../utils/Repeat';

import './index.css';

export default function BarChart () {
  return (
    <div className='bar-box'>
      <Repeat times={5}>
        <div className='bar-scale' />
      </Repeat>
    </div>
  );
}

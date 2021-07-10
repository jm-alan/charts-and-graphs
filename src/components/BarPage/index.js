import BarChart from '../BarChart';
import RandomBar from '../BarChart/RandomBar';

export default function BarPage () {
  return (
    <div id='bar-page'>
      <BarChart scaleMax={1000} scaleStep={50}>
        <RandomBar
          upDown
          heightInterval={200}
          colorInterval={200}
        />
        <RandomBar
          heightInterval={250}
          colorInterval={215}
        />
        <RandomBar
          upDown
          heightInterval={50}
          colorInterval={230}
        />
        <RandomBar
          heightInterval={250}
          colorInterval={245}
        />
        <RandomBar
          upDown
          heightInterval={100}
          colorInterval={260}
        />
      </BarChart>
    </div>
  );
}

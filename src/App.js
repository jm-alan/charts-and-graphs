import { Route, Switch } from 'react-router-dom';
import BarChart from './components/BarChart';
import NavBar from './components/NavBar';
import PieChart from './components/PieChart';

export default function App () {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/barchart/'>
          <BarChart />
        </Route>
        <Route path='/piechart/'>
          <PieChart />
        </Route>
      </Switch>
    </>
  );
}

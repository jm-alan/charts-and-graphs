import { Route, Switch } from 'react-router-dom';
import BarPage from './components/BarPage';
import NavBar from './components/NavBar';
import PieChart from './components/PieChart';

export default function App () {
  return (
    <>
      <NavBar />
      <div id='below-navbar'>
        <Switch>
          <Route path='/barchart/'>
            <BarPage />
          </Route>
          <Route path='/piechart/'>
            <PieChart />
          </Route>
        </Switch>
      </div>
    </>
  );
}

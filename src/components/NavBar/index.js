import { NavLink } from 'react-router-dom';

import './index.css';

export default function NavBar () {
  return (
    <nav>
      <NavLink to='/barchart'>
        Bar Chart
      </NavLink>
      <NavLink to='/piechart'>
        Pie Chart
      </NavLink>
    </nav>
  );
}

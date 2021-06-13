import './App.css';
import NavBar from './components/nav bar/navBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Foods from './components/foods/foods';
import Categories from './components/categories/categories';
import Food from './components/food in category/food';
import createCategory from './components/create category/createCategory';
import CreateFood from './components/create food/createFood';
import Checkout from './components/checkout/checkout';

function App() {
  return (
    <Router>
      <NavBar />
      <section>
        <Switch>
          <Route path="/create-food" component={CreateFood} />
          <Route path="/create-category" component={createCategory} />
          <Route path="/foods" component={Foods} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/:id" component={Food} />
          <Route path="/" component={Categories} exact />
        </Switch>
      </section>
    </Router>
  );
}

export default App;

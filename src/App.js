import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/login';
import SignUp from './components/signUp';
import ChatRoom from './components/chatRoom'
import PrivateRoutes from './components/privateRoutes';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PrivateRoutes exact path='/' component={ChatRoom} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

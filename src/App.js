import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/login';
import SignUp from './components/signUp';
import ChatRoom from './components/chatRoom'
import PrivateRoutes from './components/privateRoutes';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PersistGate loading={null} persistor={persistor}>
            <PrivateRoutes exact path='/' component={ChatRoom} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </PersistGate>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

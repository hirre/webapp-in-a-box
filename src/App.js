import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { React } from 'react'
import Login from './components/Login';
import Menu from './components/navigation/Menu'
import './App.css'

function App() 
{
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/main' component={Menu}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;

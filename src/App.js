import { Switch, BrowserRouter, Route } from 'react-router-dom';
import React, { createContext } from 'react'
import Login from './components/Login';
import MainPage from './components/navigation/MainPage'
import './App.css';

const AppContext = createContext({ IsLoggedIn: false});

export const useAppContext = () =>
{
    const ctx = React.useContext(AppContext);

    if (ctx === undefined)
    {
      throw new Error("useAppContext undefined!");
    }

    return ctx;
}

const App = () => 
{
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/main' component={MainPage}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;

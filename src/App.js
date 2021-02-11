import { Switch, BrowserRouter, Route } from "react-router-dom";
import React, { createContext, useContext } from "react";
import Login from "./components/Login";
import Test from "./components/Test";
import Signup from "./components/Signup";
import MainPage from "./components/navigation/MainPage";
import "./App.css";

const AppContext = createContext({ IsLoggedIn: false });

export const useAppContext = () => {
	const ctx = useContext(AppContext);

	if (ctx === undefined) {
		throw new Error("useAppContext undefined!");
	}

	return ctx;
};

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/main" component={MainPage} />
				<Route exact path="/test" component={Test} />
				<Route exact path="/signup" component={Signup} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
export { AppContext };

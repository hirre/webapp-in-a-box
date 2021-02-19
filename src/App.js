/*
	Copyright 2021 Hirad Asadi (Web App in a Box)

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import React, { createContext, useContext } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Test from "./components/navigation/Test";
import ActivationPage from "./components/activation/ActivationPage";
import ResendActivation from "./components/activation/ResendActivation";
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
				<Route exact path="/">
					<Redirect to="/login" />
				</Route>
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/activation" component={ActivationPage} />
				<Route exact path="/resendActivation" component={ResendActivation} />
				<Route exact path="/main" component={MainPage} />
				<Route exact path="/test" component={Test} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
export { AppContext };

import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useAppContext } from "../../App";
import Api from "./../api/Api";

const Test = () => {
	const appCtx = useAppContext();
	const [isLoggedIn, setIsLoggedIn] = useState(appCtx.isLoggedIn);
	const history = useHistory();
	const search = useLocation().search;
	const input = new URLSearchParams(search).get("i");

	useEffect(() => {
		const checkLogin = async () => {
			if (appCtx.IsLoggedIn !== undefined && !appCtx.IsLoggedIn) {
				appCtx.IsLoggedIn = await Api.refreshToken();
				setIsLoggedIn(appCtx.IsLoggedIn);
			}

			if (!appCtx.IsLoggedIn) history.push("/");
		};

		checkLogin();
	}, [isLoggedIn, appCtx, history]);

	return (
		<div style={{ display: appCtx.IsLoggedIn ? "block" : "none" }}>
			<h1>Test {input}!</h1>
			<br />
			<br />
			<br />
			<Link to="/main">&lt;&lt; Main page</Link>
		</div>
	);
};

export default Test;

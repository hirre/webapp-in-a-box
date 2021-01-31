import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./api/Api";
import { useAppContext } from "./../App";

const Test = () => {
	const appCtx = useAppContext();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleErrors = (response) => {
		if (!response.ok) {
			throw Error(response.statusText);
		}

		return response;
	};

	useEffect(() => {
		async function reloadTest() {
			var loggedIn = await Api.refreshCall();

			if (loggedIn === false) {
				setIsLoggedIn(false);
			} else {
				setIsLoggedIn(true);
			}
		}

		async function fetchData() {
			const requestOptions = {
				credentials: "include",
				method: "GET",
				headers: { "Content-Type": "application/json" },
			};

			await fetch("https://localhost/api/AuthTest", requestOptions)
				.then(handleErrors)
				.then(async (response) => {})
				.catch((error) => {});
		}

		reloadTest();
		fetchData();
	}, []);

	appCtx.IsLoggedIn = isLoggedIn;

	return (
		<div>
			Is logged in: {"" + appCtx.IsLoggedIn}
			<br />
			<Link to="/main">Main</Link>
		</div>
	);
};

export default Test;

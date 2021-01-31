import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./api/Api";
import { useAppContext } from "./../App";

const Test = () => {
	const appCtx = useAppContext();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const checkLogin = async () => {
			if (isLoggedIn !== undefined && !isLoggedIn)
				setIsLoggedIn(await Api.refreshToken());
		};

		checkLogin();
	}, [isLoggedIn]);

	useEffect(() => {
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

		const handleErrors = (response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}

			return response;
		};

		fetchData();
	});

	return (
		<div>
			Is logged in: {"" + isLoggedIn}
			<br />
			<Link to="/main">Main</Link>
		</div>
	);
};

export default Test;

import React, { useEffect } from "react";
import Api from "./api/Api";
import { useAppContext } from "./../App";

const Test = () => {
	const appCtx = useAppContext();

	window.onbeforeunload = async (e) => {
		if (appCtx.IsLoggedIn) return;

		var loggedIn = await Api.refreshCall();

		if (loggedIn === false) {
			appCtx.IsLoggedIn = false;
		} else {
			appCtx.IsLoggedIn = true;
		}
	};

	const handleErrors = (response) => {
		if (!response.ok) {
			throw Error(response.statusText);
		}

		return response;
	};

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
		fetchData();
	}, []);

	return <div>Test page</div>;
};

export default Test;

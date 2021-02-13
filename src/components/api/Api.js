const ApiEndPoint = "https://localhost";

const handleErrors = async (response) => {
	if (!response.ok) {
		let msg = "";
		await response.json().then((data) => {
			msg = data["Exception"];
		});

		throw Error(msg);
	}

	return response;
};
const refreshToken = async () => {
	let loggedIn = false;

	const requestOptions = {
		credentials: "include",
		method: "POST",
		headers: { "Content-Type": "application/json" },
	};

	await fetch(ApiEndPoint + "/api/Auth/User/Refresh", requestOptions)
		.then(handleErrors)
		.then(async (response) => {
			loggedIn = true;
		})
		.catch((error) => {
			loggedIn = false;
		});

	return loggedIn;
};

const loginCall = async (uName, pwd) => {
	let loggedIn = false;

	const requestOptions = {
		credentials: "include",
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username: uName, password: pwd }),
	};

	await fetch(ApiEndPoint + "/api/Auth/User", requestOptions)
		.then(handleErrors)
		.then(async (response) => {
			loggedIn = true;
		})
		.catch((error) => {
			loggedIn = false;
		});

	return loggedIn;
};

const signupCall = async (uName, pwd, email, reCaptchaValue) => {
	const requestOptions = {
		credentials: "include",
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			username: uName,
			password: pwd,
			activationemail: email,
			recaptcha: reCaptchaValue,
		}),
	};

	let msg = "Signup failed!";

	await fetch(ApiEndPoint + "/api/Register/User", requestOptions)
		.then(handleErrors)
		.then(async (response) => {
			msg = "";
		})
		.catch((error) => {
			msg = error.message;
		});

	return msg;
};

const activationCall = async (tempCode) => {
	const requestOptions = {
		credentials: "include",
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	let msg = "Activation failed!";

	await fetch(
		ApiEndPoint + "/api/Register/ActivateUser/" + tempCode,
		requestOptions
	)
		.then(handleErrors)
		.then(async (response) => {
			msg = "";
		})
		.catch((error) => {
			msg = error.message;
		});

	return msg;
};

const resendActivationCall = async (email) => {
	const requestOptions = {
		credentials: "include",
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	let msg = "Activation failed!";

	await fetch(
		ApiEndPoint + "/api/Register/ResendActivationEmail/" + email,
		requestOptions
	)
		.then(handleErrors)
		.then(async (response) => {
			msg = "";
		})
		.catch((error) => {
			msg = error.message;
		});

	return msg;
};

const logoutCall = async () => {
	const requestOptions = {
		credentials: "include",
		method: "POST",
		headers: { "Content-Type": "application/json" },
	};

	let msg = "Logout failed!";

	await fetch(ApiEndPoint + "/api/Auth/Logout", requestOptions)
		.then(handleErrors)
		.then(async (response) => {
			msg = "";
		})
		.catch((error) => {
			msg = error.message;
		});

	return msg;
};

const Api = {
	loginCall,
	refreshToken,
	signupCall,
	logoutCall,
	activationCall,
	resendActivationCall,
};

export default Api;

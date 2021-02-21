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

const ApiEndPoint = "https://localhost";

/**
 * Handle errors.
 * @param  {response} response object.
 */
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

/**
 * Send refresh token to get access token.
 * @returns {boolean} true on success (logged in), else false.
 */
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

/**
 * Login.
 * @param  {string} uName The username.
 * @param  {string} pwd The password.
 */
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

/**
 * Signup user.
 * @param  {string} uName The username.
 * @param  {string} pwd The password.
 * @param  {string} email The e-mail address.
 * @param  {string} reCaptchaValue The ReCaptcha value.
 * @returns {string} empty string on success, else error string.
 */
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

/**
 * Activates a user account.
 * @param  {string} tempCode The temporary code.
 * @returns {string} empty string on success, else error string.
 */
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

/**
 * Resends activation e-mail.
 * @param  {string} email The e-mail address.
 * @returns {string} empty string on success, else error string.
 */
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

/**
 * 	Logout.
 */
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

/**
 * Reset password.
 */
const resetPasswordCall = async (tmpCode, pwd) => {
	const requestOptions = {
		credentials: "include",
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			temporarycode: tmpCode,
			newpassword: pwd,
		}),
	};

	let msg = "Reset password failed!";

	await fetch(ApiEndPoint + "/api/Register/ResetPassword", requestOptions)
		.then(handleErrors)
		.then(async (response) => {
			msg = "";
		})
		.catch((error) => {
			msg = error.message;
		});

	return msg;
};

// API interface
const Api = {
	loginCall,
	refreshToken,
	signupCall,
	logoutCall,
	activationCall,
	resendActivationCall,
	resetPasswordCall,
};

export default Api;

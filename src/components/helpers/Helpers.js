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

/**
 * Validates e-mail field.
 * @param  {string} email The e-mail address.
 * @returns {boolean} True on succes, else false.
 */
const validateEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

/**
 * Checks if password is strong enough.
 * @param  {string} password The password.
 * @param  {function} pwd1HelperTextCallback The password helper text callback.
 * @returns {boolean} True on a valid password strength, else false.
 */
const checkPasswordStrength = (password, pwd1HelperTextCallback) => {
	// If textBox is empty
	if (password.length === 0) {
		pwd1HelperTextCallback("");

		return false;
	}

	// Regular Expressions
	var regex = [];
	regex.push("[A-Z]"); // For Uppercase Alphabet
	regex.push("[a-z]"); // For Lowercase Alphabet
	regex.push("[0-9]"); // For Numeric Digits
	regex.push("[$@$!%*#?&]"); // For Special Characters

	var passed = 0;

	// Validation for each Regular Expression
	for (var i = 0; i < regex.length; i++) {
		if (new RegExp(regex[i]).test(password)) {
			passed++;
		}
	}

	// Validation for Length of Password
	if (passed > 2 && password.length > 8) {
		passed++;
	}

	// Display of Status
	var error = false;
	var passwordStrength = "";
	switch (passed) {
		case 0:
		default:
			break;
		case 1:
			passwordStrength = "Password is Weak.";
			error = true;
			break;
		case 2:
			passwordStrength = "Password is Good.";
			break;
		case 3:
			break;
		case 4:
			passwordStrength = "Password is Strong.";
			break;
		case 5:
			passwordStrength = "Password is Very Strong.";
			break;
	}

	pwd1HelperTextCallback(passwordStrength);

	return error;
};

const Helpers = {
	validateEmail,
	checkPasswordStrength,
};

export default Helpers;

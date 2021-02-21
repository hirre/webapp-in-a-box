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

import React, { useRef, useState } from "react";
import { Button, TextField, Typography, Box } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import Helpers from "../helpers/Helpers";
import Api from "../api/Api";

const ResetPassword = () => {
	const history = useHistory();
	const search = useLocation().search;
	const temporarySecret = new URLSearchParams(search).get("u");
	const pwd1TextfieldRef = useRef();
	const [pwd1ErrorState, setPwd1ErrorState] = useState(false);
	const [pwd1HelperText, setPwd1HelperTextState] = useState("");
	const pwd2TextfieldRef = useRef();
	const [pwd2ErrorState, setPwd2ErrorState] = useState(false);
	const [isBoxVisible, setBoxVisible] = useState(true);

	const handleReset = async (e) => {
		e.preventDefault();

		if (Boolean(pwd1TextfieldRef.current.value)) {
			setPwd1ErrorState(false);
		} else {
			// Error return
			setPwd1ErrorState(true);
			return;
		}

		if (
			!Helpers.checkPasswordStrength(
				pwd1TextfieldRef.current.value,
				setPwd1HelperTextState
			)
		) {
			setPwd1ErrorState(false);
		} else {
			// Error return
			setPwd1ErrorState(true);
			return;
		}

		setPwd1HelperTextState("");

		if (Boolean(pwd2TextfieldRef.current.value)) {
			setPwd2ErrorState(false);
		} else {
			// Error return
			setPwd2ErrorState(true);
			return;
		}

		if (pwd1TextfieldRef.current.value === pwd2TextfieldRef.current.value) {
			setPwd1ErrorState(false);
			setPwd2ErrorState(false);
		} else {
			// Error return
			setPwd1ErrorState(true);
			setPwd2ErrorState(true);
			return;
		}

		await Api.resetPasswordCall(
			temporarySecret,
			pwd1TextfieldRef.current.value
		);

		setBoxVisible(false);
		setTimeout(() => history.push("/"), 2000);
	};

	return (
		<React.Fragment>
			<div style={{ display: isBoxVisible ? "block" : "none" }}>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					minHeight="100vh"
				>
					<form noValidate autoComplete="on" onSubmit={handleReset}>
						<Typography variant="h4" component="h2" direction="center">
							Reset password
						</Typography>

						<br />

						<TextField
							id="password1"
							label="Password"
							error={pwd1ErrorState}
							type="password"
							autoComplete="current-password"
							variant="outlined"
							inputRef={pwd1TextfieldRef}
							helperText={pwd1HelperText}
							InputProps={{
								style: { marginBottom: 10, width: 300 },
							}}
						/>

						<br />

						<TextField
							id="password2"
							label="Re-enter password"
							error={pwd2ErrorState}
							type="password"
							autoComplete="current-password"
							variant="outlined"
							inputRef={pwd2TextfieldRef}
							InputProps={{
								style: { marginBottom: 10, width: 300 },
							}}
						/>
						<br />
						<div dir="rtl">
							<Button type="submit" variant="contained" color="primary">
								Reset
							</Button>
						</div>
					</form>
				</Box>
			</div>
			<div style={{ display: !isBoxVisible ? "block" : "none" }}>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					minHeight="100vh"
				>
					<Typography variant="h6" component="h2" direction="center">
						Thank you!
					</Typography>
				</Box>
			</div>
		</React.Fragment>
	);
};

export default ResetPassword;

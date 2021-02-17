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
import { Button, TextField, Box, Typography } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import Api from "../api/Api";

/**
 * Resends the activation to the entered e-mail address.
 */
const ResendActivation = () => {
	const emailTextfieldRef = useRef();
	const history = useHistory();
	const [isResendVisible, setResendVisible] = useState(true);

	const handleResendActivation = async (e) => {
		e.preventDefault();

		setResendVisible(false);

		await Api.resendActivationCall(emailTextfieldRef.current.value);

		setTimeout(() => history.push(""), 2000);
	};

	return (
		<React.Fragment>
			<div style={{ display: isResendVisible ? "block" : "none" }}>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					minHeight="100vh"
				>
					<form noValidate autoComplete="on" onSubmit={handleResendActivation}>
						<Typography variant="h4" component="h2" direction="center">
							Forgot your password?
						</Typography>

						<br />

						<TextField
							id="email"
							label="E-mail"
							defaultValue=""
							variant="outlined"
							inputRef={emailTextfieldRef}
							InputProps={{
								style: { marginBottom: 10, marginRight: 10 },
							}}
						/>

						<Button type="submit" variant="contained" color="primary">
							Send
						</Button>

						<br />
						<br />

						<Link to="/login">&lt;&lt; Login</Link>
					</form>
				</Box>
			</div>
			<div style={{ display: !isResendVisible ? "block" : "none" }}>
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

export default ResendActivation;

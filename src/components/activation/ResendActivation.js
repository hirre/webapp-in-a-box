import React, { useRef, useState } from "react";
import { Button, TextField, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Api from "../api/Api";

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

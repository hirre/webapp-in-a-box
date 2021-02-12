import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import {
	Button,
	TextField,
	Typography,
	Box,
	Snackbar,
	IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import { Alert, AlertTitle } from "@material-ui/lab";

import Api from "./api/Api";

const Signup = () => {
	const useStyles = makeStyles((theme) => ({
		root: {
			width: "30%",
			margin: "0 auto",
		},
	}));

	const history = useHistory();
	const classes = useStyles();
	const [successSignup, setSuccessSignupOpen] = useState(false);
	const unameTextfieldRef = useRef();
	const [unameErrorState, setUnameErrorState] = useState(false);
	const pwd1TextfieldRef = useRef();
	const [pwd1ErrorState, setPwd1ErrorState] = useState(false);
	const [pwd1HelperText, setPwd1HelperTextState] = useState("");
	const pwd2TextfieldRef = useRef();
	const [pwd2ErrorState, setPwd2ErrorState] = useState(false);
	const email1TextfieldRef = useRef();
	const [email1ErrorState, setEmail1ErrorState] = useState(false);
	const email2TextfieldRef = useRef();
	const [email2ErrorState, setEmail2ErrorState] = useState(false);
	const [snackOpen, setErrorSnackOpen] = useState(false);
	const [snackMessage, setSnackMessage] = useState("");

	const handleSignup = async (e) => {
		e.preventDefault();

		if (Boolean(unameTextfieldRef.current.value)) {
			setUnameErrorState(false);
		} else {
			// Error return
			setUnameErrorState(true);
			return;
		}

		if (Boolean(pwd1TextfieldRef.current.value)) {
			setPwd1ErrorState(false);
		} else {
			// Error return
			setPwd1ErrorState(true);
			return;
		}

		if (!checkPasswordStrength(pwd1TextfieldRef.current.value)) {
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

		if (
			Boolean(email1TextfieldRef.current.value) &&
			validateEmail(email1TextfieldRef.current.value)
		) {
			setEmail1ErrorState(false);
		} else {
			// Error return
			setEmail1ErrorState(true);
			return;
		}

		if (Boolean(email2TextfieldRef.current.value)) {
			setEmail2ErrorState(false);
		} else {
			// Error return
			setEmail2ErrorState(true);
			return;
		}

		if (email1TextfieldRef.current.value === email2TextfieldRef.current.value) {
			setEmail1ErrorState(false);
			setEmail2ErrorState(false);
		} else {
			// Error return
			setEmail1ErrorState(true);
			setEmail2ErrorState(true);
			return;
		}

		// Register new user
		let signupStatus = await Api.signupCall(
			unameTextfieldRef.current.value,
			pwd1TextfieldRef.current.value,
			email1TextfieldRef.current.value
		);

		if (signupStatus === "") {
			setErrorSnackOpen(false);
			setSuccessSignupOpen(true);
		} else {
			setSnackMessage(signupStatus);
			// Error
			setErrorSnackOpen(true);
		}
	};

	const validateEmail = (email) => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	const checkPasswordStrength = (password) => {
		// If textBox is empty
		if (password.length === 0) {
			setPwd1HelperTextState("");

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

		setPwd1HelperTextState(passwordStrength);

		return error;
	};

	const handleSuccessClose = () => {
		setErrorSnackOpen(false);
		history.push("/login");
	};

	return (
		<React.Fragment>
			<div className={classes.root}>
				<Collapse in={successSignup}>
					<Alert
						variant="filled"
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={handleSuccessClose}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
					>
						<AlertTitle>Signup successful!</AlertTitle>
						Don't forget to activate you account.
					</Alert>
				</Collapse>
			</div>

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
				visibility={!successSignup ? "visible" : "hidden"}
			>
				<Snackbar
					anchorOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					open={snackOpen}
					autoHideDuration={6000}
					onClose={() => setErrorSnackOpen(false)}
					message={snackMessage}
					action={
						<React.Fragment>
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={() => setErrorSnackOpen(false)}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</React.Fragment>
					}
				/>
				<form noValidate autoComplete="on" onSubmit={handleSignup}>
					{/* <div
						id="signupcontext"
						style={{ display: !successSignup ? "block" : "none" }}
					> */}
					<Typography variant="h4" component="h2" direction="center">
						Signup
					</Typography>

					<br />

					<TextField
						id="username"
						label="Username"
						error={unameErrorState}
						defaultValue=""
						variant="outlined"
						inputRef={unameTextfieldRef}
						InputProps={{
							style: { marginBottom: 10 },
						}}
					/>

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
							style: { marginBottom: 10 },
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
							style: { marginBottom: 10 },
						}}
					/>

					<br />

					<TextField
						id="email"
						label="E-mail"
						error={email1ErrorState}
						defaultValue=""
						variant="outlined"
						inputRef={email1TextfieldRef}
						InputProps={{
							style: { marginBottom: 10 },
						}}
					/>

					<br />

					<TextField
						id="email"
						label="Re-enter e-mail"
						error={email2ErrorState}
						defaultValue=""
						variant="outlined"
						inputRef={email2TextfieldRef}
						InputProps={{
							style: { marginBottom: 10 },
						}}
					/>

					<br />

					<div dir="rtl">
						<Button type="submit" variant="contained" color="primary">
							Signup
						</Button>
					</div>
					{/* </div> */}
				</form>
			</Box>
		</React.Fragment>
	);
};

export default Signup;

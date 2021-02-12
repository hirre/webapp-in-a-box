import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
	Button,
	TextField,
	Typography,
	Box,
	Snackbar,
	IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Api from "./api/Api";
import { useAppContext } from "../App";

const Login = () => {
	const unameTextfieldRef = useRef();
	const pwdTextfieldRef = useRef();
	const [snackOpen, setErrorSnackOpen] = useState(false);
	const appCtx = useAppContext();
	const history = useHistory();

	useEffect(() => {
		const checkLogin = async () => {
			if (appCtx.IsLoggedIn !== undefined && !appCtx.IsLoggedIn) {
				appCtx.IsLoggedIn = await Api.refreshToken();
			}

			if (appCtx.IsLoggedIn) history.push("/main");
		};

		checkLogin();
	}, [appCtx, history]);

	const handleLogin = async (e) => {
		e.preventDefault();
		var loggedIn = await Api.loginCall(
			unameTextfieldRef.current.value,
			pwdTextfieldRef.current.value
		);

		if (loggedIn === false) {
			// Error
			setErrorSnackOpen(true);
			appCtx.IsLoggedIn = false;
		} else {
			setErrorSnackOpen(false);
			appCtx.IsLoggedIn = true;

			// Route to main view
			history.push("/main");
		}
	};

	return (
		<React.Fragment>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<form noValidate autoComplete="on" onSubmit={handleLogin}>
					<Snackbar
						anchorOrigin={{
							vertical: "top",
							horizontal: "center",
						}}
						open={snackOpen}
						autoHideDuration={6000}
						onClose={() => setErrorSnackOpen(false)}
						message="Access denied"
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

					<Typography variant="h4" component="h2" direction="center">
						Login
					</Typography>

					<br />

					<TextField
						id="username"
						label="Username"
						defaultValue=""
						variant="outlined"
						inputRef={unameTextfieldRef}
						InputProps={{
							style: { marginBottom: 10 },
						}}
					/>

					<br />

					<TextField
						id="password"
						label="Password"
						type="password"
						autoComplete="current-password"
						variant="outlined"
						inputRef={pwdTextfieldRef}
						InputProps={{
							style: { marginBottom: 10 },
						}}
					/>

					<br />

					<div dir="rtl">
						<Button type="submit" variant="contained" color="primary">
							Login
						</Button>
					</div>

					<div>
						<Link to="/signup">Sign up</Link>
						<br />
						<br />
						<Link to="/resendActivation">Forgot your password?</Link>
					</div>
				</form>
			</Box>
		</React.Fragment>
	);
};

export default Login;

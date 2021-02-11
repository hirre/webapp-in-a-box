import React, { useRef, useState } from "react";
import { Button, TextField, Typography, Box } from "@material-ui/core";

const Signup = () => {
	const unameTextfieldRef = useRef();
	const [unameErrorState, setUnameErrorState] = useState(false);
	const pwdTextfieldRef1 = useRef();
	const pwdTextfieldRef2 = useRef();
	const emailTextfieldRef1 = useRef();
	const emailTextfieldRef2 = useRef();

	const handleSignup = async (e) => {
		e.preventDefault();

		setUnameErrorState(false);

		if (Boolean(unameTextfieldRef.current.value)) {
			// Error return
			setUnameErrorState(true);
			return;
		}

		if (Boolean(pwdTextfieldRef1.current.value)) {
			// Error return
		}

		if (Boolean(pwdTextfieldRef2.current.value)) {
			// Error return
		}

		if (Boolean(emailTextfieldRef1.current.value)) {
			// Error return
		}

		if (Boolean(emailTextfieldRef2.current.value)) {
			// Error return
		}

		if (pwdTextfieldRef1 !== pwdTextfieldRef2) {
			// Error return
		}

		if (emailTextfieldRef1 !== emailTextfieldRef2) {
			// Error return
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
				<form noValidate autoComplete="on" onSubmit={handleSignup}>
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
						type="password"
						autoComplete="current-password"
						variant="outlined"
						inputRef={pwdTextfieldRef1}
						InputProps={{
							style: { marginBottom: 10 },
						}}
					/>

					<br />

					<TextField
						id="password2"
						label="Re-enter password"
						type="password"
						autoComplete="current-password"
						variant="outlined"
						inputRef={pwdTextfieldRef2}
						InputProps={{
							style: { marginBottom: 10 },
						}}
					/>

					<br />

					<TextField
						id="email"
						label="E-mail"
						defaultValue=""
						variant="outlined"
						inputRef={emailTextfieldRef1}
						InputProps={{
							style: { marginBottom: 10 },
						}}
					/>

					<br />

					<TextField
						id="email"
						label="Re-enter e-mail"
						defaultValue=""
						variant="outlined"
						inputRef={emailTextfieldRef2}
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
				</form>
			</Box>
		</React.Fragment>
	);
};

export default Signup;

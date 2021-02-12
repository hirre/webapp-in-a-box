import React from "react";
import {
	Typography,
	Box
} from "@material-ui/core";

const ActivationPage = () => {
	return (
		<React.Fragment>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<Typography variant="h4" component="h2" direction="center">
					Activation successful!
				</Typography>
			</Box>
		</React.Fragment>
	);
};

export default ActivationPage;

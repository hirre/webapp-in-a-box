import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import Api from "../api/Api";

const ActivationPage = () => {
	const history = useHistory();
	const search = useLocation().search;
	const temporarySecret = new URLSearchParams(search).get("u");
	const [activationStatus, setActivationStatus] = useState(
		"Activation pending..."
	);
	const [bgColor, setBgColor] = useState("background.paper");
	const [isBoxVisible, setBoxVisible] = useState(false);

	useEffect(() => {
		const activate = async (tempCode) => {
			let aStatus = await Api.activationCall(tempCode);

			if (aStatus === "") {
				setBgColor("green");
				setActivationStatus("Activation successful!");
				setTimeout(() => history.push("/"), 3000);
			} else {
				setBgColor("red");
				setActivationStatus(aStatus + ".");
			}

			setBoxVisible(true);
		};

		activate(temporarySecret);
	}, [temporarySecret, history]);

	const WhiteTextTypography = withStyles({
		root: {
			color: "#FFFFFF",
		},
	})(Typography);

	return (
		<React.Fragment>
			<Box
				bgcolor={bgColor}
				m={10}
				p={10}
				boxShadow={3}
				display="flex"
				justifyContent="center"
				alignItems="center"
				visibility={isBoxVisible}
			>
				<WhiteTextTypography variant="h4" component="h2" direction="center">
					{activationStatus}
				</WhiteTextTypography>
			</Box>
		</React.Fragment>
	);
};

export default ActivationPage;

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

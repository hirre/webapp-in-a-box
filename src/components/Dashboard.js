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

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		maxWidth: 275,
		margin: 5,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

const Dashboard = () => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Box display="flex" justifyContent="center">
				<Card className={classes.root} variant="outlined">
					<CardContent>
						<Typography
							className={classes.title}
							color="textSecondary"
							gutterBottom
						>
							Dashboard item 1
						</Typography>
						<Typography variant="h5" component="h2">
							An item
						</Typography>
						<Typography className={classes.pos} color="textSecondary">
							Data
						</Typography>
						<Typography variant="body2" component="p">
							Test test, this is a test.
						</Typography>
					</CardContent>
					<CardActions>
						<Link to="/test?i=1">
							<Button size="small">Enter</Button>
						</Link>
					</CardActions>
				</Card>
				<Card className={classes.root} variant="outlined">
					<CardContent>
						<Typography
							className={classes.title}
							color="textSecondary"
							gutterBottom
						>
							Dashboard item 2
						</Typography>
						<Typography variant="h5" component="h2">
							Another item
						</Typography>
						<Typography className={classes.pos} color="textSecondary">
							Data
						</Typography>
						<Typography variant="body2" component="p">
							Another test here.
						</Typography>
					</CardContent>
					<CardActions>
						<Link to="/test?i=2">
							<Button size="small">Enter</Button>
						</Link>
					</CardActions>
				</Card>
				<Card className={classes.root} variant="outlined">
					<CardContent>
						<Typography
							className={classes.title}
							color="textSecondary"
							gutterBottom
						>
							Dashboard item 3
						</Typography>
						<Typography variant="h5" component="h2">
							Third item
						</Typography>
						<Typography className={classes.pos} color="textSecondary">
							Data
						</Typography>
						<Typography variant="body2" component="p">
							Third test here.
						</Typography>
					</CardContent>
					<CardActions>
						<Link to="/test?i=3">
							<Button size="small">Enter</Button>
						</Link>
					</CardActions>
				</Card>
			</Box>
		</React.Fragment>
	);
};

export default Dashboard;

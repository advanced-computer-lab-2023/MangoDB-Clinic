import React from "react";
import { Link } from "react-router-dom";
import { Typography,Grid,Button } from "@mui/material";




const centerStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "20vh",
};

const buttonStyle = {
	margin: "10px",
};
export default function Profile() {
	return (
		<div style={centerStyle}>
			<br></br>
			<Grid item xs={12} style={{ padding: "5px" ,marginTop: "20px"}}>
						<Typography variant='h2'>My Profile</Typography>
					</Grid>
			
			<div style={{ marginTop: "280px" }}>
				<Link to='/linkfammember'>
				<Button variant='contained' >
				Add Family Member
			</Button>
			<br></br>

				</Link>
				<Link to='/linkpatasfam'>
				<Button variant='contained' >
				Link Patient as Family Member
			</Button>
			<br></br>

				</Link>
				<Link to='/viewfammembers'>
				<Button variant='contained' >
				View Registered Family Members
			</Button>
			<br></br>
				</Link>
				<Link to='/viewhealthrecpat'>
				<Button variant='contained' >
				View health records
			</Button>
			<br></br>

				</Link>
				<Link to='/viewHealthPackageSubscription'>
				<Button variant='contained' >
				View Health Package Subscription
			</Button>
			<br></br>

				</Link>
				<Link to='/cancelHealthPackageSubscription'>
				<Button variant='contained' >
				Cancel Health Package Subscription
			</Button>
				</Link>
			</div>
		</div>
	);
}

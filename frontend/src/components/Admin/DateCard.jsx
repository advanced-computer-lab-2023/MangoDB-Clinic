import * as React from "react";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Title from "./Title";

export default function DateCard() {
	const today = new Date();
	const formattedDate = today.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<React.Fragment>
			<Typography variant="h2">Date</Typography>
			<Typography variant='h6' sx={{fontSize: "32px"}}>
				{formattedDate}
			</Typography>
			<Typography color='text.secondary' sx={{ flex: 1 }}></Typography>
			<div>
				<Link
					color='secondary'
					href='https://www.weather.com'
					target='_blank'
					rel='noopener noreferrer'
				>
					View Weather
				</Link>
			</div>
		</React.Fragment>
	);
}

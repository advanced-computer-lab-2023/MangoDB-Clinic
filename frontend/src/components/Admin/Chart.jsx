import * as React from "react";
import axios from "axios";

import { ThemeProvider } from "@mui/material/styles";

import { theme } from "../../theme";

import { Typography } from "@mui/material";

export default function Chart() {
	const [name, setName] = React.useState(null);

	React.useEffect(() => {
		const getName = async () => {
			try {
				const response = await axios.get(
					"http://localhost:4000/admin/my-info",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);

				setName(response.data.name);
			} catch (error) {
				console.error("Error fetching name: ", error);
			}
		};

		getName();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<React.Fragment>
				<Typography variant='h2'>Welcome Back {name}!</Typography>
			</React.Fragment>
		</ThemeProvider>
	);
}

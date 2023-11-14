import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Title from "./Title";
import axios from "axios";

const getName = async () => {
	try {
		const response = await axios.get("http://localhost:4000/admin/my-info", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		return response.data.name;
	} catch (error) {}
};

export default function Chart() {
	const theme = useTheme();
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
				console.error("Error fetching name:", error);
			}
		};

		getName();
	}, []);

	return (
		<React.Fragment>
			<Title>Welcome Back {name}!</Title>
		</React.Fragment>
	);
}

import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackButton = (style) => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<Button variant='outlined' color='primary' onClick={handleBack}>
			Back
		</Button>
	);
};

export default BackButton;

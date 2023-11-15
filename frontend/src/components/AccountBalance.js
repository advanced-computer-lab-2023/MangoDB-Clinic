import { Card, CardContent, Typography } from "@mui/material";

const AccountBalance = ({ balance }) => {
	return (
		<Card
			sx={{
				minWidth: 150,
				maxWidth: 200,
				minHeight: 60,
				padding: 1,
				textAlign: "left",
			}}
		>
			<CardContent>
				<Typography variant='h6'>Account Balance</Typography>
				<Typography variant='subtitle1'>{balance} EGP available</Typography>
			</CardContent>
		</Card>
	);
};

export default AccountBalance;

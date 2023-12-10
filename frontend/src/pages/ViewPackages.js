import * as React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

import { checkout1 } from "../services/api";

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{"Copyright © "}
			<Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const fetchPackages = async () => {
    const response = await fetch('http://localhost:4000/view_health_packages');
    const data = await response.json();
    return data;
};

const handleClick = async (e) => {
	try {
		const name = e.currentTarget.getAttribute("name");
		const items = [{ id: 1, quantity: 1 }];

		const response = await checkout1(name, items);

		// Check if the request was successful (status code 2xx)
		if (response.status === 200) {
			const { url } = response.data;
			console.log("Checkout Session:", response.data);
			// Handle the session object as needed (e.g., redirect to the checkout page)
			window.location = url;
		} else {
			console.error("Failed to create checkout session");
			// Handle error as needed
		}
	} catch (error) {
		console.error("Error during checkout:", error);
		// Handle error as needed
	}
};

// const tiers = [
// 	{
// 		title: "Silver",
// 		price: "3600",
// 		description: [
// 			"40% off any doctor's session price",
// 			"20% off any medicine ordered from our pharmacy",
// 			"10% discount on the subscribtion price of any of your family members on any package",
// 			"Phone & email support",
// 		],
// 		buttonText: "Subscribe",
// 		buttonVariant: "contained",
// 	},
// 	{
// 		title: "Gold",
// 		subheader: "Most popular",
// 		price: "6000",
// 		description: [
// 			"60% off any doctor's session price",
// 			"30% off any medicine ordered from our pharmacy",
// 			"15% discount on the subscribtion price of any of your family members on any package",
// 			"Phone & email support",
// 		],
// 		buttonText: "Subscribe",
// 		buttonVariant: "contained",
// 	},
// 	{
// 		title: "Platinum",
// 		price: "9000",
// 		description: [
// 			"80% off any doctor's session price",
// 			"40% off any medicine ordered from our pharmacy",
// 			"20% discount on the subscribtion price of any of your family members on any package",
// 			"Phone & email support",
// 		],
// 		buttonText: "Subscribe",
// 		buttonVariant: "contained",
// 	},
// ];

// const footers = [
// 	{
// 		title: "Company",
// 		description: ["Team", "History", "Contact us", "Locations"],
// 	},
// 	{
// 		title: "Features",
// 		description: [
// 			"Cool stuff",
// 			"Random feature",
// 			"Team feature",
// 			"Developer stuff",
// 			"Another one",
// 		],
// 	},
// 	{
// 		title: "Resources",
// 		description: [
// 			"Resource",
// 			"Resource name",
// 			"Another resource",
// 			"Final resource",
// 		],
// 	},
// 	{
// 		title: "Legal",
// 		description: ["Privacy policy", "Terms of use"],
// 	},
// ];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {

	const [packages, setPackages] = React.useState([]);

    React.useEffect(() => {
        fetchPackages().then(data => setPackages(data));
    }, []);
	
	return (
		<ThemeProvider theme={defaultTheme}>
		<GlobalStyles
			styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
		/>
		<CssBaseline />
		<AppBar
			position='static'
			color='default'
			elevation={0}
			sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
		>
				<Toolbar sx={{ flexWrap: "wrap" }}>
					<Link
						variant='h6'
						href='/patientdashboard'
						color='inherit'
						noWrap
						sx={{ flexGrow: 1 }}
					>
						El7a2ny
					</Link>
					<nav>
						<Link
							variant='button'
							color='text.primary'
							href='#'
							sx={{ my: 1, mx: 1.5 }}
						>
							Features
						</Link>
						<Link
							variant='button'
							color='text.primary'
							href='#'
							sx={{ my: 1, mx: 1.5 }}
						>
							Enterprise
						</Link>
						<Link
							variant='button'
							color='text.primary'
							href='#'
							sx={{ my: 1, mx: 1.5 }}
						>
							Support
						</Link>
					</nav>
					<Button href='#' variant='outlined' sx={{ my: 1, mx: 1.5 }}>
						Login
					</Button>
				</Toolbar>
			</AppBar>
			{/* Hero unit */}
			<Container
				disableGutters
				maxWidth='sm'
				component='main'
				sx={{ pt: 8, pb: 6 }}
			>
				<Typography
					component='h1'
					variant='h2'
					align='center'
					color='text.primary'
					gutterBottom
				>
					Package Pricing
				</Typography>
				<Typography
					variant='h5'
					align='center'
					color='text.secondary'
					component='p'
				>
					We offer 3 different packages for our patients to try and improve
					their experience with us.
				</Typography>
			</Container>
			{/* End hero unit */}
			<Container maxWidth='md' component='main'>
                <Grid container spacing={5} alignItems='flex-end'>
                    {packages.map((tier) => (
                        <Grid item key={tier.name} xs={12} sm={tier.title === 'Platinum' ? 12 : 6} md={4}>
                            <Card>
                                <CardHeader
                                    title={tier.name}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    action={tier.name === 'Gold' ? <StarIcon /> : null}
                                    sx={{ pb: 1 }}
                                />
                                <CardContent>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component='li'
                                                variant='subtitle1'
                                                align='center'
                                                key={line}
                                                sx={{ mt: 1, mb: 1 }}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions sx={{ pb: 2, justifyContent: 'center' }}>
                                    <Button
                                        fullWidth
                                        variant={tier.buttonVariant}
                                        color='primary'
                                        onClick={handleClick}
                                        name={tier.name}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
			{/* Footer */}
			{/* <Container
				maxWidth='md'
				component='footer'
				sx={{
					borderTop: (theme) => `1px solid ${theme.palette.divider}`,
					mt: 8,
					py: [3, 6],
				}}
			>
				<Grid container spacing={4} justifyContent='space-evenly'>
					{footers.map((footer) => (
						<Grid item xs={6} sm={3} key={footer.title}>
							<Typography variant='h6' color='text.primary' gutterBottom>
								{footer.title}
							</Typography>
							<ul>
								{footer.description.map((item) => (
									<li key={item}>
										<Link href='#' variant='subtitle1' color='text.secondary'>
											{item}
										</Link>
									</li>
								))}
							</ul>
						</Grid>
					))}
				</Grid>
				<Copyright sx={{ mt: 5 }} />
			</Container> */}
			{/* End footer */}
		</ThemeProvider>
	);
}

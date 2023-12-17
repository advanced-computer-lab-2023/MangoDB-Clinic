import { 
    Paper,
    ThemeProvider,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Button,
    CardActions,
    CardHeader,
    Snackbar,
    Dialog,
    DialogContent,
    Chip,
    Avatar
    } from "@mui/material";
import theme from "../../theme";
import MuiAlert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import { checkout1, checkoutWithWallet } from "../../services/api";
import PatientHeader from "../../components/GeneralComponents/patientHeader";
import { useNavigate } from "react-router-dom";

const PackageCard = ({ packages, handleClick, subscribed, packageInfo, payWithWallet }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleReload = () => {
        setTimeout(() => {
            navigate(0);
        }, 2000)
    };
    
    const getBackgroundColor = (type) => {
        switch (type) {
            case 'Silver Package':
                return 'linear-gradient(45deg, #c0c0c0, #f0f0f0)'; 
            case 'Gold Package':
                return 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), ' +
                'radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)';
                  
            case 'Platinum Package':
                return 'linear-gradient(45deg, #dedeff, #ffffff 16%, #dedeff 36%, #ffffff 45%, #ffffff 60%, #dedeff 72%, #ffffff 80%, #dedeff 84%, #555564)';
            default:
                return 'white';
        }
    };

    const headerBackgroundColor = getBackgroundColor(packages.name);

    return (
        <Grid item>
            <Card style={{ width: "300px", height: "350px", marginBottom: "8px"}}>
                <CardHeader
                    title={packages.name === 'Gold Package' ? packages.name + " 🌟" : packages.name}
                    subheader={packages.description}
                    titleTypographyProps={{ 
                        align: 'center',
                        style: { color: 'black' }, 
                        variant: 'h4'
                    }}
                    subheaderTypographyProps={{
                        align: 'center',
                        style: { color: 'black' }
                    }}
                    
                    style={{ background: headerBackgroundColor }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                        EGP{packages.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        /yr
                    </Typography>
                  </Box>
                  <ul>
                    
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="left"
                        key={packages.doctorSessionDiscount}
                      >
                        {packages.doctorSessionDiscount * 100}% discount on doctor sessions
                      </Typography>
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="left"
                        key={packages.medicineDiscount}
                      >
                        {packages.medicineDiscount * 100}% discount on Medicines
                      </Typography>
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="left"
                        key={packages.familyDiscount}
                      >
                        {packages.familyDiscount * 100}% discount for family members
                      </Typography>
                      
                  </ul>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => setOpen(true)}
                        name={packages.name}
                        disabled={subscribed && packageInfo.packageId.name !== packages.name}
                    >
                        {subscribed && packageInfo.packageId.name === packages.name ? 'Renew Subscription' : 'Subscribe'}
                    </Button>
                </CardActions>
            </Card>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <Typography align="center" variant="h4" style={{ paddingBottom: "1rem" }}>
                        Please choose a payment method:
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={(e) => { handleClick(e); setOpen(false); }}
                                name={packages.name}
                            >
                                Credit Card
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={(e) => { payWithWallet(e); setOpen(false); handleReload(); }}
                                name={packages.name}
                            >
                                Wallet
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

        </Grid>
    );
};

const ViewPackagesPatient = () => {
    const [packages, setPackages] = useState([]);
    const [subscribed, setSubscribed] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [packageCancelled, setPackageCancelled] = useState({});
    const [packageInfo, setPackageInfo] = useState({});
    const [patient, setPatient] = useState({});
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openErrorMessage, setOpenErrorMessage] = useState(false);
    const [openSuccessWalletPayment, setOpenSuccessWalletPayment] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPackages = async () => {
			setIsPending(true);
			setError(null);

			const token = localStorage.getItem("token");
			try {
				const res = await fetch(
					"http://localhost:4000/patient/view_health_packages",
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);

				if (!res.ok) {
					throw Error("Could not fetch the data for that resource");
				}

				const data = await res.json();
				setPackages(data);
				setIsPending(false);
			} catch (err) {
				setError(err.message);
				setIsPending(false);
			}
		};
		fetchPackages();
	}, []);

	useEffect(() => {
		const checkSubscription = async () => {
            try {
              const data = await subscribedPatient();
                console.log("enttt");
              if (data.healthPackage.status === "Subscribed") {
                setSubscribed(true);
                setCancelled(false);
                setPackageInfo(data.healthPackage);
                setPatient(data.patient);
                console.log(data.healthPackage);
                console.log(data);
              } else if (data.healthPackage.status === "Cancelled") {
                setCancelled(true);
                setSubscribed(false);
                setPackageInfo(data.healthPackage);
                setPatient(data.patient);
              } else {
                setSubscribed(false);
                setCancelled(false); 
                setPackageInfo(null);
                setPatient(null);
              }
            } catch (error) {
              console.error("Error while checking subscription:", error);
            }
          };
          
		checkSubscription();
	}, [cancelled, subscribed]);

	const unsubscribe = async () => {
		const confirmed = window.confirm("Are you sure you want to unsubscribe?");
		if (confirmed) {
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(
					"http://localhost:4000/patient/cancel_health_package",
					{
						method: "PUT",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);
				const data = await response.json();
				setCancelled(true);
				setSubscribed(false);
				console.log(data);
				setPackageCancelled(data);
				setOpenSuccess(true);
				return data;
			} catch (err) {
				console.log(err);
			}
		}
	};

	const subscribedPatient = async () => {
		const token = localStorage.getItem("token");
		const response = await fetch(
			"http://localhost:4000/patient/check_health_package_subscription",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();

		return data;
	};

	const handleClick = async (e) => {
		try {
			const id = e.currentTarget.getAttribute("name").split(" ")[0];
			console.log(id);
			const items = [{ id: 1, quantity: 1 }];

			const response = await checkout1(id, items);

			if (response.status === 200) {
				const { url } = response.data;
				console.log("Checkout Session:", response.data);
				window.location = url;
			} else {
				console.error("Failed to create checkout session");
			}
		} catch (error) {
			console.error("Error during checkout:", error);
		}
	};

    const payWithWallet = async (e) => {
        const confirmed = window.confirm("Are you sure you want to subscribe?");
        if (confirmed) {
    
            try {
                const packageId = e.currentTarget.getAttribute("name").split(" ")[0];

                const response = await checkoutWithWallet(packageId);

                if (response.status === 200) {
                    setOpenSuccessWalletPayment(true);
                    console.log("Package was paid for successfully");

                } else {
                    console.error("Error during checkout:", response.data.error);
                    setOpenError(true);
                    console.log("Error Message:", response.data.error);
                    setOpenErrorMessage(response.data.error || "An unexpected error occurred.");

                }
            } catch (error) {

                console.error("Error during checkout:", error);
                setOpenError(true);
                setOpenErrorMessage("An unexpected error occurred.");

            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSuccess(false);
        setOpenError(false);
        setOpenErrorMessage(""); // Clear the error message when closing the Snackbar
    };

    const handleCloseSnackbarPayment = () => {
        setOpenSuccessWalletPayment(false);
    };

    return (  
        <ThemeProvider theme={theme}>
            <PatientHeader />
            <Typography align="center" variant="h2" paddingTop={3}>
                Packages Pricing
            </Typography>
            <Typography align="center" variant="h5" padding={3}>
                We offer 3 different packages for our patients to try and improve their experience with us.
            </Typography>
            <Grid container justifyContent="center" style={{display: "flex", padding: "5rem"}}>
                <Paper elevation={3} style={{padding: "2rem"}}>
                    <Grid container spacing={3} style={{ justifyContent: "space-between"}}>
                        {packages.map((packages, index) => (
                            <PackageCard 
                                key={index}
                                packages={packages}
                                handleClick={handleClick}
                                subscribed={subscribed}
                                packageInfo={packageInfo}
                                payWithWallet={payWithWallet}
                                 />
                        ))}
                    </Grid>
                    {subscribed &&
                    <Paper elevation={3} style={{padding: "2rem", margin: "2rem"}}>
                        <Typography align="center" variant="h4" style={{paddingBottom: "1rem"}}>
                           Package Subscription info
                        </Typography>
                        <Typography align="left" variant="h6" >
                            You are subscribed to the {packageInfo.packageId.name}, experience the endless opportunities you get from this package .
                        </Typography>
                        <Typography align="left" variant="h6" >
                            Package Renewal: {new Date(packageInfo.renewalDate).toLocaleDateString()}
                        </Typography>
                        <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                            <Typography align="center" variant="h4" style={{paddingBottom: "1rem"}}>
                                Family members enjoying the package:
                            </Typography>
                            {patient.family.length > 0 ? (
                                patient.family.map((familyMember, index) => (
                                    <Grid item key={index}>
                                    <Paper elevation={1} style={{ padding: '1rem', textAlign: 'center' }}>
                                        <Chip
                                        avatar={<Avatar>{getInitials(familyMember.name)}</Avatar>}
                                        label={`${familyMember.name}`}
                                        />
                                    </Paper>
                                    </Grid>
                                ))
                                ) : (
                                <Grid item>
                                    <Paper elevation={1} style={{ padding: '1rem', textAlign: 'center' }}>
                                    No family members available.
                                    </Paper>
                                </Grid>
                                )}
                        </Grid>
                        <Button 
                            variant="outlined" 
                            color="secondary"
                            onClick={async () => {
                                await unsubscribe();
                            }}
                            name="Unsubscribe"
                        >
                            Unsubscribe
                        </Button>
                    </Paper>
                    }
                    {cancelled &&
                    <Paper elevation={3} style={{padding: "2rem", margin: "2rem"}}>
                        <Typography align="center" variant="h4" style={{paddingBottom: "1rem"}}>
                           Package Subscription info
                        </Typography>
                        <Typography align="left" variant="h6" >
                            You have cancelled your old package {packageCancelled.name}
                        </Typography>
                        <Typography align="left" variant="h6" >
                            Cancellation Date: {new Date(packageInfo.cancellationDate).toLocaleDateString()}
                        </Typography>
                        <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                            <Typography align="center" variant="h5" style={{paddingBottom: "1rem"}}>
                                Canclled packages from your family members:
                            </Typography>
                            {patient.family.length > 0 ? (
                                patient.family.map((familyMember, index) => (
                                    <Grid item key={index}>
                                    <Paper elevation={1} style={{ padding: '1rem', textAlign: 'center' }}>
                                        <Chip
                                        avatar={<Avatar>{getInitials(familyMember.name)}</Avatar>}
                                        label={`${familyMember.name}`}
                                        />
                                    </Paper>
                                    </Grid>
                                ))
                                ) : (
                                <Grid item>
                                    <Paper elevation={1} style={{ padding: '1rem', textAlign: 'center' }}>
                                    No family members available.
                                    </Paper>
                                </Grid>
                                )}
                        </Grid>
                    </Paper>
                    }   
                </Paper>
            </Grid>
            <Snackbar
                open={openSuccessWalletPayment}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={6000}
                onClose={handleCloseSnackbarPayment}
                >
                <MuiAlert
                    onClose={handleCloseSnackbarPayment}
                    severity="success"
                    elevation={6}
                    variant="filled"
                >
                    Package was Subscribed Succefully.
                </MuiAlert>
            </Snackbar>
            <Snackbar
                open={openSuccess}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                >
                <MuiAlert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    elevation={6}
                    variant="filled"
                >
                    Package was Unsubscribed Succefully.
                </MuiAlert>
            </Snackbar>
            <Snackbar
                open={openError}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <MuiAlert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    elevation={6}
                    variant="filled"
                >
                    insuffecient balance, please recharge your wallet.
                </MuiAlert>
            </Snackbar>
        </ThemeProvider>
     );
}

function getInitials(firstName) {
    return `${firstName.charAt(0)}`;
}
 
export default ViewPackagesPatient;

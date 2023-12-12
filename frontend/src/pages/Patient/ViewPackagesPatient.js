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
    CardHeader
    } from "@mui/material";
import theme from "../../theme";
import { useState, useEffect } from "react";
import { checkout1, checkout2 } from "../../services/api";

const PackageCard = ({ packages, handleClick }) => {
    
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
                        £{packages.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        /mo
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
                        onClick={handleClick}
                        name={packages.name}
                    >
                        Subscribe
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

const ViewPackagesPatient = () => {
    const [packages, setPackages] = useState([]);
    const [subscribed, setSubscribed] = useState(false);
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
                });

                if (!res.ok) {
                    throw Error("Could not fetch the data for that resource");
                }

                const data = await res.json();
                setPackages(data);
                setIsPending(false);
            }
            catch (err) {
                setError(err.message);
                setIsPending(false);
            }
        }
        fetchPackages();
    }, []);

    const getIdOfPatient = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:4000/patient/myInfo", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            return data._id;
        }
        catch (err) {
            console.log(err);
        }

    }
    
    const subscribedPatient = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/patient/view_health_packages", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if(data === "Subscribed"){
            setSubscribed(true);
        }
        else{
            setSubscribed(false);
        }
        return data;
    }

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

    return (  
        <ThemeProvider theme={theme}>
            <Typography align="center" variant="h2" paddingTop={3}>
                Packeges Pricing
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
                                handleClick={handleClick} />
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </ThemeProvider>
     );
}
 
export default ViewPackagesPatient;
import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40vh" }}>
            <Paper sx={{ width: "fit-content", padding: "50px" }}>
                <Typography
                    variant="h1"
                >
                    404 Page Not Found
                </Typography>

                <Typography
                    variant="body1"
                >
                    The page you're trying to reach is not available. Click <Link to="/">here</Link> to go back to the homepage.
                </Typography>
            </Paper>
        </div>
    );
};

export default NotFound;
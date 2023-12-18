import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Notifications from "./Notifiactions";
import { useNavigate } from "react-router-dom";
import { getDoctor, viewWalletDoctor } from "../../services/api";

export default function DoctorHeader({ onError }) {
	const navigate = useNavigate();

	const [doctor, setDoctor] = React.useState("");
	const [balance, setBalance] = React.useState(null);

	const [openProfileDrawer, setOpenProfileDrawer] = React.useState(false);

	const [open, setOpen] = React.useState(false);
	const MenuIcon = `${process.env.PUBLIC_URL}/icons/menu.svg`;
	const Logo = `${process.env.PUBLIC_URL}/icons/clinicLogo2.svg`;
	const Close = `${process.env.PUBLIC_URL}/icons/reject.svg`;
	const DashboardIcon = `${process.env.PUBLIC_URL}/icons/dashboard.svg`;
	const ProfileIcon = `${process.env.PUBLIC_URL}/icons/profile.svg`;
	const AppointmentsIcon = `${process.env.PUBLIC_URL}/icons/appointment.svg`;
	const DoctorsIcon = `${process.env.PUBLIC_URL}/icons/doctor.svg`;
	const HealthPackageIcon = `${process.env.PUBLIC_URL}/icons/healthPackage.svg`;
	const PrescriptionsIcon = `${process.env.PUBLIC_URL}/icons/prescription.svg`;
	const AddIcon = `${process.env.PUBLIC_URL}/icons/add.svg`;
	const DateIcon = `${process.env.PUBLIC_URL}/icons/date.svg`;
	const ViewIcon = `${process.env.PUBLIC_URL}/icons/date.svg`;
	const ChatIcon = `${process.env.PUBLIC_URL}/icons/chat.svg`;
	const VideoIcon = `${process.env.PUBLIC_URL}/icons/video.svg`;
	const AcceptIcon = `${process.env.PUBLIC_URL}/icons/accept.svg`;
	const LogoutIcon = `${process.env.PUBLIC_URL}/icons/logout.svg`;
	const NotificationsIcon = `${process.env.PUBLIC_URL}/icons/notifications.svg`;
	const WalletIcon = `${process.env.PUBLIC_URL}/icons/wallet.svg`;
	const PatientsIcon = `${process.env.PUBLIC_URL}/icons/patient.svg`;
	const ViewPatientsIcon = `${process.env.PUBLIC_URL}/icons/patients.svg`;
	const HealthRecordsIcon = `${process.env.PUBLIC_URL}/icons/clinicalRecord.svg`;
	const chatIcon = `${process.env.PUBLIC_URL}/icons/chat.svg`;

	React.useEffect(() => {
		viewWalletDoctor()
			.then((result) => {
				console.log(result.data.wallet);
				setBalance(result.data.wallet.balance);
			})
			.catch((err) => console.log(err));

		getDoctor()
			.then((result) => {
				setDoctor(result.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleLogout = () => {
		localStorage.clear();
		navigate("/");
	};

	const list = () => (
		<Box
			sx={{
				width: "250px",
				p: 2,
				mt: 3,
				display: "flex",
				flexDirection: "column",
				position: "relative",
				height: "100%",
			}}
		>
			<Box
				sx={{
					mt: 6, // Adjust this value to position the button below the AppBar
					mb: 3,
					display: "flex",
					alignItems: "center", // This will align the items vertically
					cursor: "pointer", // This will change the cursor to a pointer when hovering over the text and icon
					justifyContent: "flex-end", // This will move the button to the right
				}}
				onClick={handleDrawerClose} // This will make the text do the same function as the icon
			>
				<IconButton sx={{ mr: 1, ml: 0, mt: 2 }}>
				</IconButton>
			</Box>
			<List sx={{ p: 0 }}>
				<ListItem
					button
					sx={{ pt: 0, pb: 1 }}
					onClick={() => handleRedirect("/doctordashboard")}
				>
					<ListItemIcon>
						<img
							src={DashboardIcon}
							style={{ width: 30, height: 30 }}
							alt='Dashboard'
						/>
					</ListItemIcon>
					<ListItemText primary='Dashboard' />
				</ListItem>

				<ListItem
					button
					sx={{ pb: 0 }}
					onClick={() => handleRedirect("/editDoctor")}
				>
					<ListItemIcon>
						<img
							src={ProfileIcon}
							style={{ width: 30, height: 30 }}
							alt='Profile'
						/>
					</ListItemIcon>
					<ListItemText primary='Profile' />
				</ListItem>
				{/* <ListItem button sx={{ pb: 1 }}>
          <ListItemIcon>
            <img
              src={NotificationsIcon}
              alt="Notifications"
              style={{ width: 26, height: 26 }}
            />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem> */}

				{/* <ListItem button sx={{ pb: 0 }}>
          <ListItemIcon>
            <img
              src={PrescriptionsIcon}
              alt="Prescriptions"
              style={{ width: 30, height: 30 }}
            />
          </ListItemIcon>
          <ListItemText primary="Prescriptions" />
        </ListItem> */}

				<ListItem
					button
					sx={{ pb: 0 }}
					onClick={() => handleRedirect("/viewAllPatients")}
				>
					<ListItemIcon>
						<img
							src={ViewPatientsIcon}
							style={{ width: 25, height: 25 }}
							alt='View All Patients'
						/>
					</ListItemIcon>
					<ListItemText primary='View All Patients' />
				</ListItem>

				{/* <Accordion
          sx={{
            boxShadow: "none",
            "&.Mui-expanded": { margin: 0 },
            "& .MuiAccordionDetails-root": {
              padding: "0 16px 0px",
            },
            border: "none",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ padding: "0 16px", border: 0 }}
          >
            <ListItemIcon>
              <img
                src={PatientsIcon}
                style={{ width: 28, height: 28 }}
                alt="Patients"
              />
            </ListItemIcon>
            <Typography>Patients</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ padding: "0 16px", alignItems: "center", border: 0 }}
          >
            <List sx={{ padding: "0px" }}>
              <ListItem button sx={{ padding: "0px 16px" }}>
                <ListItemIcon>
                  <img
                    src={ViewPatientsIcon}
                    style={{ width: 25, height: 25 }}
                    alt="View All Patients"
                  />
                </ListItemIcon>
                <ListItemText primary="View All Patients" />
              </ListItem>
              <ListItem button sx={{ pb: 1 }}>
                <ListItemIcon>
                  <img
                    src={HealthRecordsIcon}
                    style={{ width: 25, height: 25 }}
                    alt="View Health Records"
                  />
                </ListItemIcon>
                <ListItemText primary="View Health Records" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion> */}
				<Accordion
					sx={{
						boxShadow: "none",
						"&.Mui-expanded": { margin: 0 },
						"& .MuiAccordionDetails-root": {
							padding: "0 16px 0px",
						},
						border: "none",
						"&:before": {
							display: "none",
						},
					}}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'
						sx={{ padding: "0 16px", border: 0 }}
					>
						<ListItemIcon>
							<img
								src={AppointmentsIcon}
								style={{ width: 31, height: 31 }}
								alt='Appointments'
							/>
						</ListItemIcon>
						<Typography>Appointments</Typography>
					</AccordionSummary>
					<AccordionDetails
						sx={{ padding: "0 16px", alignItems: "center", border: 0 }}
					>
						<List sx={{ padding: "0px" }}>
							<ListItem
								button
								sx={{ padding: "0px 16px" }}
								onClick={() => handleRedirect("/addslots")}
							>
								<ListItemIcon>
									<img
										src={AddIcon}
										style={{ width: 25, height: 25 }}
										alt='Add slots'
									/>
								</ListItemIcon>
								<ListItemText primary='Add slots' />
							</ListItem>
							<ListItem
								button
								sx={{ pb: 1 }}
								onClick={() => handleRedirect("/doctorAppointments")}
							>
								<ListItemIcon>
									<img
										src={ViewIcon}
										style={{ width: 25, height: 25 }}
										alt='View All Appointments'
									/>
								</ListItemIcon>
								<ListItemText primary='View All Appointments' />
							</ListItem>
						</List>
					</AccordionDetails>
				</Accordion>
				<ListItem
					button
					sx={{ pb: 0 }}
					onClick={() => handleRedirect("/viewPrescriptionsByDoctor")}
				>
					<ListItemIcon>
						<img
							src={PrescriptionsIcon}
							alt='Prescriptions'
							style={{ width: 30, height: 30 }}
						/>
					</ListItemIcon>
					<ListItemText primary='Prescriptions' />
				</ListItem>
			</List>

			<Box
				sx={{
					position: "absolute", // This will take your logout button out of the normal flow
					bottom: 0, // This will position your logout button at the bottom of the box
					width: "100%", // This will make your logout button take up the full width of the box
				}}
			>
				<ListItem
					button
					sx={{ mb: 5, padding: "5px 16px" }}
					onClick={handleLogout}
				>
					<ListItemIcon>
						<img
							src={LogoutIcon}
							alt='Logout'
							style={{ width: 25, height: 25 }}
							sx={{ pr: -2, mr: -2 }}
						/>
					</ListItemIcon>
					<ListItemText primary='Logout' />
				</ListItem>
			</Box>
		</Box>
	);

	const handleDrawerOpen = () => {
		if (open) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleRedirect = (path) => {
		navigate(path);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='relative'
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
					background: "#2fc4b2",
				}}
			>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2, ml: 3 }}
						onClick={handleDrawerOpen}
					>
						<img
							src={MenuIcon}
							alt='Menu'
							style={{ width: 30, height: 30, filter: "invert(1)" }}
						/>
						<Typography
							variant='h6'
							sx={{
								color: "#fff",
								ml: 2,
								fontWeight: "bold",
								scale: "110%",
								marginTop: "3px",
							}}
						>
							Menu
						</Typography>
					</IconButton>
					<Box sx={{ flexGrow: 1 }} />
					<img
						src={Logo}
						alt='Logo'
						style={{
							height: 50,
							position: "absolute",
							left: "50%",
							transform: "translateX(-50%)",
						}}
					/>

					{
						/* HANDLE NOTIFS HERE */
						<Notifications type='doctor' onError={onError} />
					}

					{/* <Avatar sx={{ marginRight: 2 }}>User's initials</Avatar> */}
					<Avatar sx={{ marginRight: 2 }}>
						{doctor ? `${doctor.firstName[0]}${doctor.lastName[0]}` : ""}
					</Avatar>
					<Typography
						variant='body1'
						sx={{ fontWeight: "bold", marginRight: -2, color: "#333" }}
					>
						{/* {"First Name"} */}
						{doctor ? doctor.firstName : ""}
					</Typography>
					<IconButton
						onClick={() => setOpenProfileDrawer(!openProfileDrawer)}
						sx={{ mr: "12px" }}
					>
						{openProfileDrawer ? (
							<ArrowDropUpIcon fontSize='large' />
						) : (
							<ArrowDropDownIcon fontSize='large' />
						)}
					</IconButton>
				</Toolbar>
			</AppBar>

			<SwipeableDrawer
				open={openProfileDrawer}
				onClose={() => setOpenProfileDrawer(false)}
				onOpen={() => setOpenProfileDrawer(true)}
				anchor='right' // This makes the drawer appear on the right
				sx={{
					"& .MuiDrawer-paper": {
						borderTopRightRadius: 8,
						borderBottomRightRadius: 8,
						zIndex: (theme) => theme.zIndex.drawer - 1, // Decrease the z-index of the Drawer
						height: "33%", // Adjust this value to change the height of the drawer
						width: "15%",
					},
				}}
				variant='persistent' // This makes the drawer persistent
			>
				<List sx={{ mt: 12 }}>
					<ListItem button onClick={() => handleRedirect("/editDoctor")}>
						<ListItemIcon>
							<img
								src={ProfileIcon}
								alt='Profile'
								style={{ width: 30, height: 30 }}
							/>
						</ListItemIcon>
						<ListItemText primary='My Profile' />
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<img
								src={WalletIcon}
								alt='Wallet'
								style={{ width: 30, height: 30 }}
							/>
						</ListItemIcon>
						<ListItemText primary='Wallet' />
						<Typography
							variant='body1'
							sx={{ fontWeight: "bold", marginRight: 2, color: "#333" }}
						>
							{/* {"$100"} Replace with actual wallet balance */}
							{`${balance} EGP`}
						</Typography>
					</ListItem>

					<ListItem button onClick={handleLogout}>
						<ListItemIcon>
							<img
								src={LogoutIcon}
								alt='Logout'
								style={{ width: 30, height: 30 }}
							/>
						</ListItemIcon>
						<ListItemText primary='Logout' />
					</ListItem>
				</List>
			</SwipeableDrawer>

			<SwipeableDrawer
				open={open}
				onClose={handleDrawerClose}
				onOpen={handleDrawerOpen}
				sx={{
					"& .MuiDrawer-paper": {
						borderTopRightRadius: 16,
						borderBottomRightRadius: 16,
						zIndex: (theme) => theme.zIndex.drawer - 1,
					},
				}}
				variant='persistent'
			>
				<List sx={{ mt: 12 }}>
					<ListItem button onClick={() => handleRedirect("/editDoctor")}>
						<ListItemIcon>
							<img
								src={ProfileIcon}
								alt='Profile'
								style={{ width: 30, height: 30 }}
							/>
						</ListItemIcon>
						<ListItemText primary='My Profile' />
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<img
								src={WalletIcon}
								alt='Wallet'
								style={{ width: 30, height: 30 }}
							/>
						</ListItemIcon>
						<ListItemText primary='Wallet' />
						<Typography
							variant='body1'
							sx={{ fontWeight: "bold", marginRight: 2, color: "#333" }}
						>
							{"$100"} {/* Replace with actual wallet balance */}
						</Typography>
					</ListItem>

					<ListItem button onClick={handleLogout}>
						<ListItemIcon>
							<img
								src={LogoutIcon}
								alt='Logout'
								style={{ width: 30, height: 30 }}
							/>
						</ListItemIcon>
						<ListItemText primary='Logout' />
					</ListItem>
				</List>
			</SwipeableDrawer>

			<SwipeableDrawer
				open={open}
				onClose={handleDrawerClose}
				onOpen={handleDrawerOpen}
				sx={{
					"& .MuiDrawer-paper": {
						borderTopRightRadius: 16,
						borderBottomRightRadius: 16,
						zIndex: (theme) => theme.zIndex.drawer - 1, // Increase the z-index of the Drawer
					},
				}}
				variant='persistent' // This makes the drawer persistent
			>
				{list()}
			</SwipeableDrawer>
		</Box>
	);
}

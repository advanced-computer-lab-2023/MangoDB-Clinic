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
import { Link, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const AdminHeader = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	console.log(userData);
	const { username, name, lastName, initials } = userData;

	const [openProfileDrawer, setOpenProfileDrawer] = React.useState(false);

	const [open, setOpen] = React.useState(false);
	const MenuIcon = `${process.env.PUBLIC_URL}/icons/menu.svg`;
	const Logo = `${process.env.PUBLIC_URL}/icons/clinicLogo2.svg`;
	const Close = `${process.env.PUBLIC_URL}/icons/reject.svg`;
	const DashboardIcon = `${process.env.PUBLIC_URL}/icons/dashboard.svg`;
	const ProfileIcon = `${process.env.PUBLIC_URL}/icons/profile.svg`;
	const PersonIcon = `${process.env.PUBLIC_URL}/icons/person.svg`;
	const AddIcon = `${process.env.PUBLIC_URL}/icons/add.svg`;
	const RemoveIcon = `${process.env.PUBLIC_URL}/icons/remove.svg`;
	const UserInfoIcon = `${process.env.PUBLIC_URL}/icons/info.svg`;
	const RequestsIcon = `${process.env.PUBLIC_URL}/icons/ticket.svg`;
	const DoctorRegistrationIcon = `${process.env.PUBLIC_URL}/icons/doctor.svg`;
	const PatientRegistrationIcon = `${process.env.PUBLIC_URL}/icons/patient.svg`;
	const PharmacyIcon = `${process.env.PUBLIC_URL}/icons/meds.svg`;
	const SettingsIcon = `${process.env.PUBLIC_URL}/icons/settings.svg`;
	const LogoutIcon = `${process.env.PUBLIC_URL}/icons/logout.svg`;
	// const NotificationsIcon = `${process.env.PUBLIC_URL}/icons/notifications.svg`;
	// const ChatIcon = `${process.env.PUBLIC_URL}/icons/chat.svg`;
	const WalletIcon = `${process.env.PUBLIC_URL}/icons/wallet.svg`;
	const EditIcon = `${process.env.PUBLIC_URL}/icons/edit.svg`;
	const HealthPackageIcon = `${process.env.PUBLIC_URL}/icons/healthPackage.svg`;

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("userData");
		localStorage.removeItem("token");
		navigate("/admin/login");
	};

	const handleRedirect = (path) => {
		navigate(path);
	};

	const list = () => (
		<Box
			sx={{
				width: "250px",
				p: 2,
				mt: 3,
				display: "flex",
				flexDirection: "column",
				position: "relative", // This will make your box a relative container
				height: "100%", // This will make your box take up the full height of the drawer
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
					onClick={() => handleRedirect("/admin")}
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

				<Accordion
					sx={{
						boxShadow: "none",
						"&.Mui-expanded": { margin: 0 },
						"& .MuiAccordionDetails-root": {
							padding: "0 16px 0px",
						},
						border: "none",
						"&:before": {
							// This targets the pseudo-element that creates the line
							display: "none", // This removes the line
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
								src={PersonIcon}
								style={{ width: 28, height: 28 }}
								alt='Manage Users'
							/>
						</ListItemIcon>
						<Typography>Manage Users</Typography>
					</AccordionSummary>
					<AccordionDetails
						sx={{ padding: "0 16px", alignItems: "center", border: 0 }}
					>
						<List sx={{ padding: "0px" }}>
							<ListItem
								button
								sx={{ padding: "0px 16px" }}
								onClick={() => handleRedirect("/admin/add-admin")}
							>
								<ListItemIcon>
									<img
										src={AddIcon}
										style={{ width: 25, height: 25 }}
										alt='Add Admin'
									/>
								</ListItemIcon>
								<ListItemText primary='Add Admin' />
							</ListItem>
							<ListItem
								button
								sx={{ pb: 1 }}
								onClick={() => handleRedirect("/admin/user-management")}
							>
								<ListItemIcon>
									<img
										src={RemoveIcon}
										style={{ width: 25, height: 25 }}
										alt='Remove User'
									/>
								</ListItemIcon>
								<ListItemText primary='Remove User' />
							</ListItem>
							{/* <ListItem button sx={{ pb: 1 }}>
                <ListItemIcon>
                  <img
                    src={UserInfoIcon}
                    style={{ width: 25, height: 25 }}
                    alt="Users Info"
                  />
                </ListItemIcon>
                <ListItemText sx={{ mb: 0 }} primary="Users Info" />
              </ListItem> */}
						</List>
					</AccordionDetails>
				</Accordion>
			</List>
			<Accordion
				sx={{
					boxShadow: "none",
					"&.Mui-expanded": { margin: 0 },
					"& .MuiAccordionDetails-root": {
						padding: "0 16px 0px",
					},
					border: "none",
					"&:before": {
						// This targets the pseudo-element that creates the line
						display: "none", // This removes the line
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
							src={RequestsIcon}
							alt='Requests'
							style={{ width: 30, height: 30 }}
						/>
					</ListItemIcon>
					<Typography>Requests</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ padding: "0 16px 0px" }}>
					<List sx={{ padding: "0px" }}>
						<ListItem
							button
							sx={{ pb: 1 }}
							onClick={() => handleRedirect("/admin/requested-doctors")}
						>
							<ListItemIcon>
								<img
									src={DoctorRegistrationIcon}
									alt='Doctor Registration'
									style={{ width: 30, height: 30 }}
								/>
							</ListItemIcon>
							<ListItemText primary='Doctor Registration' />
						</ListItem>
						{/* <ListItem button sx={{ pb: 0 }}>
              <ListItemIcon>
                <img
                  src={PatientRegistrationIcon}
                  alt="Patient Registration"
                  style={{ width: 30, height: 30 }}
                />
              </ListItemIcon>
              <ListItemText primary="Patient Registration" />
            </ListItem> */}
					</List>
				</AccordionDetails>
			</Accordion>

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
							src={HealthPackageIcon}
							alt='Health Packages'
							style={{ width: 30, height: 30 }}
						/>
					</ListItemIcon>
					<Typography>Health Packages</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ padding: "0 16px 0px" }}>
					<List sx={{ padding: "0px" }}>
						<ListItem
							button
							sx={{ pb: 1 }}
							onClick={() => handleRedirect("/admin/add-health-pack")}
						>
							<ListItemIcon>
								<img
									src={AddIcon}
									alt='Add'
									style={{ width: 30, height: 30 }}
								/>
							</ListItemIcon>
							<ListItemText primary='Add' />
						</ListItem>
						{/* <ListItem button sx={{ pb: 1 }}>
              <ListItemIcon>
                <img
                  src={RemoveIcon}
                  alt="Delete"
                  style={{ width: 30, height: 30 }}
                />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </ListItem> */}
						<ListItem
							button
							sx={{ pb: 0 }}
							onClick={() => handleRedirect("/admin/health-packs")}
						>
							<ListItemIcon>
								<img
									src={EditIcon}
									alt='Edit'
									style={{ width: 30, height: 30 }}
								/>
							</ListItemIcon>
							<ListItemText primary='View Health Packages' />
						</ListItem>
					</List>
				</AccordionDetails>
			</Accordion>

			<ListItem
				button
				sx={{ pb: 0 }}
				onClick={() => handleRedirect("/admin/change-password")}
			>
				<ListItemIcon>
					<img
						src={SettingsIcon}
						alt='Settings'
						style={{ width: 30, height: 30 }}
					/>
				</ListItemIcon>
				<ListItemText primary='Change Password' />
			</ListItem>

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

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='relative'
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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

					<Avatar sx={{ marginRight: 2 }}>{initials}</Avatar>
					<Typography
						variant='body1'
						sx={{ fontWeight: "bold", marginRight: -2, color: "#333" }}
					>
						{/* {"First Name"} */}
						{name} {lastName}
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
						borderTopRightRadius: 16,
						borderBottomRightRadius: 16,
						zIndex: (theme) => theme.zIndex.drawer - 1, // Decrease the z-index of the Drawer
						height: "25%", // Adjust this value to change the height of the drawer
						width: "15%",
					},
				}}
				variant='persistent' // This makes the drawer persistent
			>
				<List sx={{ mt: 12 }}>
					{" "}
					{/* Add a top margin to the List */}
					{/* <ListItem button>
            <ListItemIcon>
              <img
                src={ProfileIcon}
                alt="Profile"
                style={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem> */}
					<ListItem button sx={{ mb: 0 }} onClick={handleLogout}>
						{" "}
						{/* Remove the bottom margin from the last ListItem */}
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
};

export default AdminHeader;

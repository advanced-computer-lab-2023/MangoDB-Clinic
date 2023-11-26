import * as React from "react";
import { Link } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TodayIcon from "@mui/icons-material/Today";
import PeopleIcon from "@mui/icons-material/People";
import MedicationIcon from "@mui/icons-material/Medication";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import WalletIcon from "@mui/icons-material/Wallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const PatientListItems = (
	<React.Fragment>
		<ListItemButton component={Link} to='/'>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary='Dashboard' />
		</ListItemButton>
		<ListItemButton component={Link} to='/viewdoctors'>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary='Doctors' />
		</ListItemButton>
		<ListItemButton component={Link} to='/viewappointments'>
			<ListItemIcon>
				<TodayIcon />
			</ListItemIcon>
			<ListItemText primary='Appointments' />
		</ListItemButton>
		<ListItemButton component={Link} to='/viewPrescriptionsOfPatient'>
			<ListItemIcon>
				<MedicationIcon />
			</ListItemIcon>
			<ListItemText primary='Prescriptions' />
		</ListItemButton>
		<ListItemButton component={Link} to='/viewpackages'>
			<ListItemIcon>
				<LoyaltyIcon />
			</ListItemIcon>
			<ListItemText primary='Packages' />
		</ListItemButton>
		<ListItemButton component={Link} to='/view_wallet'>
			<ListItemIcon>
				<WalletIcon />
			</ListItemIcon>
			<ListItemText primary='Wallet' />
		</ListItemButton>
		<ListItemButton component={Link} to='/viewprofile'>
			<ListItemIcon>
				<AccountCircleIcon />
			</ListItemIcon>
			<ListItemText primary='Profile' />
		</ListItemButton>
		<ListItemButton component={Link} to='/changePasswordPatient'>
			<ListItemIcon>
				<AccountCircleIcon />
			</ListItemIcon>
			<ListItemText primary='Change Password' />
		</ListItemButton>
	</React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );

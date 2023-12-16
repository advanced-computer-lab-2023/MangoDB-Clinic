import * as React from "react";
import { Link } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TodayIcon from "@mui/icons-material/Today";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MedicationIcon from "@mui/icons-material/Medication";

export const DoctorListItems = (
	<React.Fragment>
		<ListItemButton component={Link} to='/'>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary='Dashboard' />
		</ListItemButton>
		<ListItemButton component={Link} to={`/viewAllPatients`}>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary='Patients' />
		</ListItemButton>
		<ListItemButton component={Link} to={`/doctorAppointments`}>
			<ListItemIcon>
				<TodayIcon />
			</ListItemIcon>
			<ListItemText primary='Appointments' />
		</ListItemButton>
		<ListItemButton component={Link} to={`/addslots`}>
			<ListItemIcon>
				<TodayIcon />
			</ListItemIcon>
			<ListItemText primary='Add Slots' />
		</ListItemButton>
		<ListItemButton component={Link} to='/viewPrescriptionsByDoctor'>
			<ListItemIcon>
				<MedicationIcon />
			</ListItemIcon>
			<ListItemText primary='Prescriptions' />
		</ListItemButton>
		<ListItemButton component={Link} to={`/editDoctor`}>
			<ListItemIcon>
				<AccountCircleIcon />
			</ListItemIcon>
			<ListItemText primary='Profile' />
		</ListItemButton>
		<ListItemButton component={Link} to={`/changePasswordDoctor`}>
			<ListItemIcon>
				<AccountCircleIcon />
			</ListItemIcon>
			<ListItemText primary='Forget Password' />
		</ListItemButton>
		<ListItemButton component={Link} to="/viewChats">
			<ListItemIcon>
				<AccountCircleIcon />
			</ListItemIcon>
			<ListItemText primary="View Chats" />
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

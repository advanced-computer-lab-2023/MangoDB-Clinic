import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export const mainListItems = (
	<React.Fragment>
		<ListItemButton href='/admin'>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary='Home' />
		</ListItemButton>

		<ListItemButton href='/admin/requested-doctors'>
			<ListItemIcon>
				<VaccinesIcon />
			</ListItemIcon>
			<ListItemText primary='Requested Doctors' />
		</ListItemButton>

		{/* TODO enter link href */}
		<ListItemButton>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary='User Management' />
		</ListItemButton>

		{/* TODO enter link href */}
		<ListItemButton>
			<ListItemIcon>
				<LocalHospitalIcon />
			</ListItemIcon>
			<ListItemText primary='Health Packages' />
		</ListItemButton>
	</React.Fragment>
);

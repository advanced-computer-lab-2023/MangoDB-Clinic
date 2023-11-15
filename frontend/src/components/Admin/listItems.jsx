import * as React from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PasswordIcon from "@mui/icons-material/Password";

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

		<ListItemButton href='/admin/user-management'>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary='User Management' />
		</ListItemButton>

		<ListItemButton href='/admin/health-packs'>
			<ListItemIcon>
				<LocalHospitalIcon />
			</ListItemIcon>
			<ListItemText primary='Health Packages' />
		</ListItemButton>

		<ListItemButton href='/admin/change-password'>
			<ListItemIcon>
				<PasswordIcon />
			</ListItemIcon>
			<ListItemText primary='Change My Password' />
		</ListItemButton>
		
	</React.Fragment>
);

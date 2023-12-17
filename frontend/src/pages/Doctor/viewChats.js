import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { getAllPharmacists, createChat, viewChats } from "../../services/api";
// import { pharmacistListItems } from '../components/ListItemsPharma';
import { useNavigate } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import DoctorHeader from "../../components/GeneralComponents/doctorHeader";

const ViewChats = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState("");
  const [doctorChats, setDoctorChats] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPharmacists()
      .then((response) => {
        setPharmacists(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });

    // Fetch pharmacist's chats when the component mounts
    viewChats()
      .then((response) => {
        setDoctorChats(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handlePharmacistChange = (e) => {
    setSelectedPharmacist(e.target.value);
  };

  const handleCreateChat = (pharmacist) => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(pharmacist);

    createChat(pharmacist.firstName, pharmacist.lastName)
      .then(() => {
        navigate(`/chat/${pharmacist._id}`);
      })
      .catch((error) => {
        console.error("Error creating chat:", error.message);
      });
  };

  const handleChatClick = (pharmacistId) => {
    navigate(`/chat/${pharmacistId}`);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <DoctorHeader />
    <Grid container sx={{ marginLeft: "250px", marginTop: "20px" }}>
      {/* Sidebar */}
      {/* <Grid
        item
        xs={12}
        sm={3}
        md={2}
        lg={2}
        xl={2}
        style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}
      >
        {pharmacistListItems}
      </Grid> */}

      {/* Main Content */}
      <Grid
        item
        xs={12}
        sm={9}
        md={10}
        lg={10}
        xl={10}
        style={{ paddingLeft: "2rem" }}
      >
        {/* Display Chat Button */}
        <IconButton
          aria-label="new-chat"
          onClick={handleMenuClick}
          style={{
            backgroundColor: "#2196f3", // Blue color for the button
            color: "#fff", // White color for the text
            borderRadius: "50%", // Make it a circle
            marginRight: "1rem", // Add margin for spacing
          }}
        >
          <AddIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          New Chat
        </Typography>

        {/* Display Doctor Dropdown */}
        <Menu
          id="pharmacist-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem disabled>Select a Pharmacist</MenuItem>
          {pharmacists.map((pharmacist) => (
            <MenuItem key={pharmacist._id} onClick={() => handleCreateChat(pharmacist)}>
              {`${pharmacist.firstName} ${pharmacist.lastName}`}
            </MenuItem>
          ))}
        </Menu>

        {/* Display Doctor's Chats */}
        <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
          Your Chats
        </Typography>
        {doctorChats.map((chat) => (
          <Paper
            key={chat._id}
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              display: "flex", // Use flex container
              justifyContent: "space-between", // Space between name, last message, and timestamp
              width: "50%",
              height: "10%",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => handleChatClick(chat.pharmacist.id)}
          >
            <div>
              <Typography variant="h5">{`${chat.pharmacist.firstName} ${chat.pharmacist.lastName}`}</Typography>
              <Typography>{chat.lastMessage.messageText}</Typography>
            </div>
            <div>
              {/* Displaying the last message's timestamp in the desired format */}
              {chat.lastMessage.timeDate && (
                <Typography>
                  {new Date(chat.lastMessage.timeDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}{" "}
                  {new Date(chat.lastMessage.timeDate).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Typography>
              )}
            </div>
          </Paper>
        ))}
      </Grid>
    </Grid>
    </>
  );
};

export default ViewChats;
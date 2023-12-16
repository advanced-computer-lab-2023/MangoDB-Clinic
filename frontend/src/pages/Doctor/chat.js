import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { getPharmacistbyId, getChat, sendMessage } from "../../services/api";
import { useParams } from 'react-router-dom';
// import { pharmacistListItems } from '../components/ListItemsPharma';

const Chat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [pharmacist, setPharmacist] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getPharmacistbyId(id)
      .then((response) => {
        setPharmacist(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });

    // Fetch chat messages when component mounts
    fetchChatMessages(id);

    // Set up interval to fetch messages every 5 seconds
    const intervalId = setInterval(() => {
      fetchChatMessages(id);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, [id]);

  const fetchChatMessages = (pharmacistId) => {
    // Fetch chat messages for the given pharmacist
    getChat({ pharmacistId })
      .then((response) => {
        if (response.messages) {
          setMessages(response.messages);
        }
      })
      .catch((error) => {
        console.error("Error fetching chat messages:", error.message);
      });
  };

  const handleSend = () => {
    // Call the sendMessage function to send a message
    sendMessage(message, id)
      .then((response) => {
        // Update the state with the sent message
        setMessages((prevMessages) => [...prevMessages, response.data]);
        // Clear the message input
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error.message);
      });
  };
  const styles = {
    youMessage: {
      backgroundColor: "#2196f3",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px",
      marginBottom: "8px",
      textAlign: "right",
      maxWidth: "50%",
      marginLeft: "auto", // Move the blue box to the right
    },
    pharmacistMessage: {
      backgroundColor: "#4caf50",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px",
      marginBottom: "8px",
      textAlign: "left",
      maxWidth: "50%",
      marginRight: "auto", // Move the green box to the left
    },
  
  };

  return (
    <Grid container>
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
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: "2rem" }}>
        {/* App Bar with Name */}
        <AppBar position="static" style={{ maxWidth: "840px" }}>
          <Toolbar>
            <Typography variant="h6">{pharmacist.firstName} {pharmacist.lastName} </Typography>
          </Toolbar>
        </AppBar>

        <Grid item xs={12}>
        <Paper id="messages-container" elevation={3} style={{ padding: "1rem", height: "60vh", overflowY: "auto", width: "100%", maxWidth: "800px" }}>
        {messages.map((message) => (
  <div key={message._id} style={message.senderRole === 'doctor' ? styles.youMessage : styles.pharmacistMessage}>
    <p>{message.messageText}</p>
    
    <p style={{ fontSize: "small", color: "rgba(0, 0, 0, 0.6)" }}>
      {new Date(message.timeDate).toLocaleTimeString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}
    </p>
  </div>
))}
          </Paper>
        </Grid>

        {/* Message Input and Send Button */}
        <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "1rem", marginTop: "1rem", maxWidth: "800px" }}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Type your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSend}
                  fullWidth
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Chat;
import { useState, useEffect } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Notification({ notification, handleNotifDelete }) {
    return (
      <div key={ notification._id }>
        <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between" }}>
          <h4>{ notification.title }</h4>
          <DeleteForeverIcon id={ notification._id } onClick={ () => handleNotifDelete(notification._id) } />
        </div>
        <p>{ notification.body }</p>
      </div>
    );
}

export default Notification;
import { Button, IconButton, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../GeneralComponents/Spinner";

const PatientRow = ({ patient }) => {
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();
    const videoIcon = `${process.env.PUBLIC_URL}/icons/video.svg`;

    const handleRowClick = () => {
        navigate(`/selectedPatient/${patient._id}`);
    };

    const handleCreateVideoChat = async (patientId) => {
		try {
			setLoading(true); // Set loading to true when starting the request

			const response = await axios.post(
				`http://localhost:4000/doctor/createVideoChat/${patientId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				window.open(response.data.url, "_blank");
			}
		} catch (error) {
			console.error("Error creating video chat:", error);
		} finally {
			setLoading(false); // Set loading to false after the request is complete
		}
	};

    return (
        // <Link
        //     to={`/selectedPatient/${patient._id}`}
        //     style={{ textDecoration: "none" }}
        // >
            <>
                { loading && <Spinner />}
                <TableRow 
                    onClick={ handleRowClick }  
                >
                    <TableCell
                        style={{ cursor: "pointer" }}
                    >
                        { patient.patientName }
                    </TableCell>

                    <TableCell
                        style={{ cursor: "pointer" }}
                    >
                        { patient.email }
                    </TableCell>

                    <TableCell>
                        {/* <Button
                            variant='contained'
                            size='small'
                            onClick={(event) => {
                                event.stopPropagation();
                                handleCreateVideoChat(patient._id);
                            }}
                        >
                            Create Video Chat
                        </Button> */}
                        <IconButton
                            onClick={(event) => {
                                event.stopPropagation();
                                handleCreateVideoChat(patient._id);
                            }}
                        >
                            <img src={videoIcon} alt="Video Icon" style={{ width: '25%', height: '25%' }} />
                        </IconButton>
                        
                    </TableCell>
                </TableRow>
            </>
        // </Link>
    );
};

export default PatientRow;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@mui/material";
import { getSelectedDoctor } from "../services/api";
import { format } from "date-fns";
import BackButton from "./GeneralComponents/BackButton";
import PatientHeader from "./GeneralComponents/patientHeader";

const DoctorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [nationalID, setNationalId] = useState("");

  useEffect(() => {
    getSelectedDoctor(id)
      .then((res) => {
        setDoctor(res.data);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id]);

  const handleNationalIdChange = (event) => {
    setNationalId(event.target.value);
  };

  const handleDateChange = (e) => {
    console.log(e.target.value)
    console.log(typeof e)
    setSelectedDate(e.target.value);
    fetchAvailableSlots(id, e.target.value);
  };

  const fetchAvailableSlots = async (doctorId, selectedDate) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:4000/patient/get_available_appointments/${id}?date=${selectedDate}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("data")
      console.log(data);
      const formattedSlots = data.map((slot) => ({
        key: new Date(`${selectedDate}T${slot}:00:00`),
        slot,
      }));
      setAvailableSlots(formattedSlots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };


  const bookAppointment = async (key, nationalID) => {
    try {
    

      const response = await axios.post(
                `http://localhost:4000/patient/make_appointment?nationalID=${nationalID}&date=${key}&docid=${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, 
                    },
                }
            );
      // if (!response.ok) {
      //   throw new Error(
      //     `Failed to make appointment. Status: ${response.status}`
      //   );
      // }
      const items = [{ id: 1, quantity: 1 }];
      const url = `http://localhost:3000/checkout/${response.data._id}`;
      // window.location = url;
      navigate(`/checkout/${response.data._id}`);

      // const response = await axios.post('/api/checkout', { appointmentId: app.data._id, items });
      //  const response=await checkout(app._id,items);
      //  if (response.status === 200) {
      //   const { url } = response.data;
      //   console.log('Checkout Session:', response.data);
      //   // Handle the session object as needed (e.g., redirect to the checkout page)
      //   window.location = url;
      // } else {
      //   console.error('Failed to create checkout session');
      //   // Handle error as needed
      // }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };


  const bookAppointmentApi = async (key, nationalID) => {
    try {
      console.log(nationalID, key, id);
      const response = await fetch(
        `http://localhost:4000/patient/make_appointment?nationalID=${nationalID}&date=${key}&docid=${id}&patientid=6526d30a0f83f5e462288354`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to make appointment. Status: ${response.status}`
        );
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("Error booking an appointment", error);
    }

    console.log("Booking appointment for key:", key);
  };

  const renderNoSlotsMessage = () => (
    <Typography variant="h4" marginTop={"20px"}>
      No available slots on {format(new Date(selectedDate), "dd-MM-yyyy")}
    </Typography>
  );

  const renderPrompt = () => (
    <h3>
      Please pick a date to see available appointments on that day. <br></br>Type the national ID number of the patient to book an appointment.
    </h3>
  );

  return (
		<>
    <PatientHeader/>
			<div style={{ marginTop: "60px" }}>
				<Paper
					elevation={3}
					style={{
						padding: "20px",
						borderRadius: "10px",
						margin: "0 60px",
					}}
				>
					{isPending && <Typography>Loading...</Typography>}
					{error && <Typography color='error'>{error}</Typography>}
					{doctor && (
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Typography variant='h4'>
									{doctor.firstName} {doctor.lastName}
								</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
								<Typography>Email: {doctor.email}</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
								<Typography>Speciality: {doctor.speciality}</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
								<Typography>
									Educational Background: {doctor.educationalBackground}
								</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
								<Typography>Affiliation: {doctor.affiliation}</Typography>
							</Grid>
						</Grid>
					)}
				</Paper>

				<Paper
					elevation={3}
					style={{
						padding: "20px",
						borderRadius: "10px",
						margin: "20px 60px",
					}}
				>
					<Grid item xs={12} marginBottom={"20px"}>
						{renderPrompt()}
					</Grid>

					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<TextField
								label='Select Date'
								type='date'
								InputLabelProps={{ shrink: true }}
								value={selectedDate}
								onChange={(e) => handleDateChange(e)}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								label='National ID'
								value={nationalID}
								onChange={handleNationalIdChange}
								fullWidth
							/>
						</Grid>
						{selectedDate && availableSlots.length === 0 && (
							<Grid item xs={12}>
								{renderNoSlotsMessage()}
							</Grid>
						)}
					</Grid>
					{selectedDate && availableSlots.length > 0 && (
						<Grid container spacing={3}>
							<Grid item xs={12} md={4}>
								<div>
									<Typography variant='h5'>Available Slots</Typography>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Start Time</TableCell>
												<TableCell>Actions</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{availableSlots.map(({ key, slot }, index) => (
												<TableRow key={index}>
													<TableCell>{format(key, "HH:mm")}</TableCell>
													<TableCell>
														<Button
															variant='contained'
															color='primary'
															onClick={() => bookAppointment(key, nationalID)}
														>
															Book Appointment
														</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</Grid>
						</Grid>
					)}
					<BackButton />
				</Paper>
			</div>
		</>
	);
};


export default DoctorDetails;

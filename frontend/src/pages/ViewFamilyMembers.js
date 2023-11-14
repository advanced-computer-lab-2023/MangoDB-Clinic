import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { viewRegFamMembers } from "../services/api";
import axios from 'axios';


const ViewFamilyMembers = async() => {
    const [familyMembers, setFamilyMembers] = useState([]); // Initialize as an empty array

   // const actualPatientId = useParams().patientId || '6526d30a0f83f5e462288354'; // Extract 'patientId' from useParams or use the default value
    const getID = async () => {
		try {
			const response = await axios.post(
				"http://localhost:4000/Patient/myInfo",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				return response.data._id;
			}
		} catch (error) {}
	};
    const id = await getID();
    const fetchData = useCallback(async () => {
        try {
            const response = await viewRegFamMembers(getID); // Make sure to use 'await' here
            setFamilyMembers(response.data); // Check the response structure to set the data accordingly
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchData(); // No need to check patientId here since it's in the dependency array
    }, [fetchData]);
    
    return (

        <div>
            <Button variant="contained" onClick={fetchData}>
                Fetch Family Members
            </Button>
            {familyMembers.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>National ID</TableCell>
                                <TableCell>Relation</TableCell>
                                <TableCell>Age</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {familyMembers.map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.nationalID}</TableCell>
                                    <TableCell>{member.relation}</TableCell>
                                    <TableCell>{member.age}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <p>No family members found.</p>
            )}
        </div>
     );
};

export default ViewFamilyMembers;
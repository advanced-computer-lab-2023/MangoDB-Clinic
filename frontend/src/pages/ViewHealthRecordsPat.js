import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getHealthRecords } from '../services/api';
import axios from 'axios';

const ViewHealthRecordsPat = () => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [openFile, setOpenFile] = useState({ open: false, fileContent: '' });
  const  id  = '6526d30a0f83f5e462288354';

  // const getID = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4000/Patient/myInfo",
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       return response.data._id;
  //     }
  //   } catch (error) {
  //     console.error('Error getting ID:', error);
  //   }
  // };

  const fetchData = useCallback(async () => {
    try {
     // const userId = await getID(); // Wait for the ID before making the request
      const response = await getHealthRecords(id);
      setHealthRecords(response.data.files);
    } catch (error) {
      console.error('Error fetching health records:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenFile = (content) => {
    setOpenFile({ open: true, fileContent: content });
  };

  const handleCloseFile = () => {
    setOpenFile({ open: false, fileContent: '' });
  };

  return (
    <div>
      <Button variant="contained" onClick={fetchData}>
        Fetch Health Records
      </Button>

      {healthRecords.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Files</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {healthRecords.map((file, fileIndex) => (
                <TableRow key={fileIndex}>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleOpenFile(file.file)}
                    >
                      {file.name}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No health records found.</p>
      )}

      <Dialog open={openFile.open} onClose={handleCloseFile}>
        <DialogTitle>Health Record File</DialogTitle>
        <DialogContent>
          <p>
            <a href={openFile.fileContent} target="_blank" rel="noopener noreferrer">
              {openFile.fileContent}
            </a>
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewHealthRecordsPat;

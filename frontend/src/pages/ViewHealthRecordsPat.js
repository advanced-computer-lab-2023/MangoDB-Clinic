import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getHealthRecords } from '../services/api';

const ViewHealthRecordsPat = () => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [openFile, setOpenFile] = useState({ open: false, fileContent: '' });
  const { id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const response = await getHealthRecords(id);
      setHealthRecords(response.data.files); // Update to access the files array from the response
    } catch (error) {
      console.error('Error fetching health records:', error);
    }
  }, [id]);

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
          <p>{openFile.fileContent}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewHealthRecordsPat;

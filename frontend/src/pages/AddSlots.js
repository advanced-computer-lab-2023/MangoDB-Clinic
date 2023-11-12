import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, Grid } from '@mui/material';
import { addSlots } from '../services/api'; // Ensure you have the 'addSlots' function

const AddSlotsPage = () => {
    const id = useParams().id
     const [weekday, setWeekday] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleChange = (field, value) => {
        switch (field) {
            case 'weekday':
                setWeekday(value);
                break;
            case 'startTime':
                setStartTime(value);
                break;
            case 'endTime':
                setEndTime(value);
                break;
            default:
                break;
        }
    };

    const handleAddSlot = async () => {
        try {
            await addSlots(id,weekday,startTime,endTime); // Sending the whole 'newSlot' object to the 'addSlots' function

            // Clear fields after successful slot addition
            setWeekday('');
            setStartTime('');
            setEndTime('');
        } catch (error) {
            console.error('Error adding time slot:', error);
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Weekday"
                        value={weekday}
                        onChange={(e) => handleChange('weekday', e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Start Time"
                        type="datetime" // Adjust the type based on the input you expect
                        value={startTime}
                        onChange={(e) => handleChange('startTime', e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="End Time"
                        type="datetime" // Adjust the type based on the input you expect
                        value={endTime}
                        onChange={(e) => handleChange('endTime', e.target.value)}
                    />
                </Grid>
            </Grid>

            <Button variant="contained" onClick={handleAddSlot}>
                Add Slot
            </Button>
        </div>
    );
};

export default AddSlotsPage;
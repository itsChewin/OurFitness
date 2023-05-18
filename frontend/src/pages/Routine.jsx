import React, { useState } from "react";
import Calendar from "../components/Calendar";
import "../pages/Routine.css";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

function Routine() {
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [routineInfo, setRoutineInfo] = useState([]);

  const handleAddNote = () => {
    setShowNote(true);
  };

  const handleChangeNote = (event) => {
    setNote(event.target.value);
  };

  const handleAddRoutine = () => {
    const newRoutineInfo = {
      number: document.getElementById("number").value,
      name: document.getElementById("name").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      notes: document.getElementById("notes").value,
    };
    setRoutineInfo([...routineInfo, newRoutineInfo]);
  };

  const handleDelete = (index) => {
    const updatedRoutineInfo = [...routineInfo];
    updatedRoutineInfo.splice(index, 1);
    setRoutineInfo(updatedRoutineInfo);
  };

  return (
    <>
      <div className="App">
        <h1 className="header-text">Set Routine</h1>
        <Calendar />
      </div>
      

      {routineInfo.length > 0 && (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 1 }}>
            Routine Information
          </Typography>
          {routineInfo.map((info, index) => (
            <div key={index}>
              <Typography variant="body1" component="p">
                Number: {info.number}
              </Typography>
              <Typography variant="body1" component="p">
                Name: {info.name}
              </Typography>
              <Typography variant="body1" component="p">
                Date: {info.date}
              </Typography>
              <Typography variant="body1" component="p">
                Time: {info.time}
              </Typography>
              <Typography variant="body1" component="p">
                Notes: {info.notes}
              </Typography>
              <Box sx={{ marginTop: 1 }}>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </Box>
            </div>
          ))}
        </Paper>
      )}

      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6" component="h2" sx={{ marginBottom: 1 }}>
          Add Routine
        </Typography>
        <TextField
          autoFocus
          variant="outlined"
          margin="dense"
          id="number"
          label="Number"
          type="number"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="name"
          fullWidth
          variant="outlined"
        />
        <TextField
          autoFocus
          margin="dense"
          id="date"
          type="date"
          fullWidth
          variant="outlined"
        />
        <TextField
          autoFocus
          margin="dense"
          id="time"
          type="time"
          fullWidth
          variant="outlined"
        />
        <TextField
          autoFocus
          margin="dense"
          id="notes"
          label="Notes"
          type="text"
          fullWidth
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleAddRoutine}>
          Add
        </Button>
      </Paper>
    </>
  );
}

export default Routine;

import { useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import GlobalContext from '../../../share/Context/GlobalContext';
import Axios from '../../../share/AxiosInstance';

const RoutineCreateModal = ({ open = false, handleClose = () => {}, setNotes = () => {} }) => {
  const [newNote, setNewNote] = useState({
    title: '',
    description: '',
  });
  const [error, setError] = useState({});
  const { setStatus } = useContext(GlobalContext);

  const validateForm = () => {
    const error = {};
    if(!newNote.title) error.title = 'Title is required';
    if(!newNote.description) error.description = 'Workout is required';
    setError(error);

    if(Object.keys(error).length) return false;
    return true;
  }

  const submit = async () => {
    if(!validateForm()) return;
    try{
      const userToken = Cookies.get('UserToken');
      const response = await Axios.post('/note', newNote,{
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if(response.data.success){
        setStatus({severity: 'success', msg: 'Create routine successfully'});
        setNotes((prev) => [...prev, response.data.data]);
        resetAndClose();
      }
    }catch(error){
      if(error instanceof AxiosError && error.response){
        setStatus({severity: 'error', msg: error.response.data.message});
      }else{
        setStatus({severity: 'error', msg: error.message});
      }
    }
  };

  const resetAndClose = () => {
    setTimeout(() => {
      setNewNote({
        title: '',
        description: '',
      });
      setError({});
    }, 500);
    handleClose();
  };

  const handleChange = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={resetAndClose}>
      <DialogTitle>Add Routine</DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="dense"
          id="title"
          name="title"
          label="Title"
          fullWidth
          variant="outlined"
          value={newNote.title}
          onChange={handleChange}
          error={!!error.title}
          helperText={error.title}
        />
        
        <TextField
          required
          multiline
          margin="dense"
          id="description"
          name="description"
          label="Workout"
          fullWidth
          value={newNote.description}
          onChange={handleChange}
          error={!!error.description}
          helperText={error.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={resetAndClose} color="error" sx={{ textTransform: 'capitalize' }}>
          Cancel
        </Button>
        <Button onClick={submit} type="submit" sx={{ textTransform: 'capitalize' }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoutineCreateModal;
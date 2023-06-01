import { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import GlobalContext from "../../../share/Context/GlobalContext";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import Axios from "../../../share/AxiosInstance";

const RoutineEditModal = ({
  note = {},
  open = false,
  handleClose = () => {},
  setNotes = () => {},
}) => {
  const [newNote, setNewNote] = useState(note);
  const [error, setError] = useState({});
  const { setStatus } = useContext(GlobalContext);

  useEffect(() => {
    setNewNote(note);
  }, [note]);

  const validateForm = () => {
    const error = {};
    if (!newNote.title) error.title = "Title is required";
    if (!newNote.description) error.description = "Description is required";
    setError(error);

    if (Object.keys(error).length) return false;
    return true;
  };

  const submit = async () => {
    if (!validateForm()) return;
    try {
      const userToken = Cookies.get("UserToken");
      const response = await Axios.patch(
        "/note",
        {
          title: newNote.title,
          description: newNote.description,
          noteId: newNote.id,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      if (response.data.success) {
        setStatus({ severity: "success", msg: "Update routine successfully" });
        setNotes((prev) =>
          prev.map((n) => (n.id === newNote.id ? response.data.data : n))
        );
        resetAndClose();
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setStatus({ severity: "error", msg: error.response.data.error });
      } else {
        setStatus({ severity: "error", msg: error.message });
      }
    }
  };

  const resetAndClose = () => {
    setTimeout(() => {
      setNewNote(note);
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
      <DialogTitle>Edit Routine</DialogTitle>
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
          placeholder="Write here..."
          fullWidth
          value={newNote.description}
          onChange={handleChange}
          error={!!error.description}
          helperText={error.description}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={resetAndClose}
          color="error"
          sx={{ textTransform: "capitalize" }}
        >
          Cancel
        </Button>
        <Button
          onClick={submit}
          type="submit"
          sx={{ textTransform: "capitalize" }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoutineEditModal;

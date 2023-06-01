import { useEffect, useState, useContext } from "react";
import { Stack, Container, Typography, Grid, Box } from "@mui/material";
import CustomButton from "../../share/components/CustomButton";
import RoutineCard from "./components/RoutineCard";
import RoutineDetailModal from "./components/RoutineDetailModal";
import RoutineCreateModal from "./components/RoutineCreateModal";
import RoutineEditModal from "./components/RoutineEditModal";
import GlobalContext from "../../share/Context/GlobalContext";
import Cookies from "js-cookie";
import Axios from "../../share/AxiosInstance";

const Routine = () => {
  const { user, setStatus } = useContext(GlobalContext);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [targetNote, setTargetNote] = useState({});
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const userToken = Cookies.get("UserToken");
    if (userToken !== undefined && userToken !== "undefined") {
      Axios.get("/notes", {
        headers: { Authorization: `Bearer ${userToken}` },
      }).then((res) => {
        setNotes(res.data.data);
      });
    }
  }, [user]);

  const handleNoteCreateOpen = () => {
    if (!user) {
      setStatus({
        msg: "You must login to set up your routine",
        severity: "error",
      });
    } else {
      setOpenCreate(true);
    }

    setTimeout(() => setStatus(), 1000);
  };
  const handleNoteCreateClose = () => {
    setOpenCreate(false);
  };

  const handleNoteEditOpen = () => {
    setOpenEdit(true);
  };
  const handleNoteEditClose = () => {
    setOpenEdit(false);
  };

  const handleNoteDetailOpen = () => {
    setOpenDetail(true);
  };
  const handleNoteDetailClose = () => {
    setOpenDetail(false);
  };

  const handleTargetNoteChange = (note) => {
    setTargetNote(note);
    handleNoteDetailOpen();
  };

  const handleEdit = () => {
    handleNoteDetailClose();
    handleNoteEditOpen();
  };

  const handleDelete = async () => {
    try {
      const userToken = Cookies.get("UserToken");
      const response = await Axios.delete(`/note/${targetNote.id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.data.success) {
        setStatus({ severity: "success", msg: "Delete routine successfully" });
        setNotes(notes.filter((n) => n.id !== targetNote.id));
        handleNoteDetailClose();
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setStatus({ severity: "error", msg: error.response.data.error });
      } else {
        setStatus({ severity: "error", msg: error.message });
      }
    }
  };

  return (
    <Container>
      <RoutineDetailModal
        note={targetNote}
        open={openDetail}
        handleClose={handleNoteDetailClose}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <RoutineEditModal
        note={targetNote}
        open={openEdit}
        handleClose={handleNoteEditClose}
        setNotes={setNotes}
      />
      <RoutineCreateModal
        open={openCreate}
        handleClose={handleNoteCreateClose}
        setNotes={setNotes}
      />

      <Typography fontSize={30} color={"black"} marginTop={"50px"}>
        Set Routine
      </Typography>
      <Box sx={{ color: "white", width: "100px", marginTop: "10px" }}>
        <CustomButton
          text="Add +"
          handle={handleNoteCreateOpen}
          fontSize={18}
        />
      </Box>
      <Typography
        fontSize={30}
        color={"black"}
        marginTop={"50px"}
        marginBottom={"10px"}
      >
        My Routine
      </Typography>
      {user ? (
        notes.length === 0 ? (
          <Typography
            textAlign="center"
            fontSize={18}
            color="white"
            fontWeight={300}
            marginTop={8}
          >
            No routine to show.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {notes.map((note, index) => (
              <Grid item xs={4} key={index}>
                <RoutineCard
                  title={note.title}
                  date={note.updatedAt}
                  handleClick={() => handleTargetNoteChange(note)}
                />
              </Grid>
            ))}
          </Grid>
        )
      ) : (
        <Typography
          textAlign="center"
          fontSize={18}
          color="black"
          fontWeight={300}
          marginTop={8}
        >
          You must login to set a routine.
        </Typography>
      )}
    </Container>
  );
};

export default Routine;

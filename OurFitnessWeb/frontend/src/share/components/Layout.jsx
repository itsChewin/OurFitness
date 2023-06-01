import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Fab } from "@mui/material";
import Narbar from "./Navbar";
import AuthModal from "../modal/auth/AuthModal";
import CommentModal from "../modal/comment/GoalsModal";
import SnackBarMessage from "../SnackBarMessage";
import GlobalContext from "../Context/GlobalContext";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const Layout = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [status, setStatus] = useState();
  const handleOpen = () => setOpenLoginModal(true);
  const handleClose = () => setOpenLoginModal(false);

  const handleCommentOpen = () => setOpenCommentModal(true);
  const handleCommentClose = () => setOpenCommentModal(false);
  const [user, setUser] = useState();
  const queryClient = new QueryClient();
  const generatekey = () => {
    return Math.random();
  };

  const globalContextValue = useMemo(() => {
    return {
      user,
      setUser,
      setStatus,
    };
  }, [user]);
  return (
    <GlobalContext.Provider value={globalContextValue}>
      <QueryClientProvider client={queryClient}>
        <Fab
          onClick={handleCommentOpen}
          sx={{
            position: "fixed",
            background: "#002B5B",
            bottom: "2rem",
            left: "2rem",
            color: "white",
            "&:hover": {
              backgroundColor: "#EA5455",
              transform: "scale(1.05)",
              transition: "all 0.1s ease-in-out",
            },
          }}
          variant="extended"
        >
          <EmojiEventsIcon />
          Goals
        </Fab>
        <Narbar handleOpen={handleOpen} />
        <Outlet />

        <AuthModal
          open={openLoginModal}
          handleClose={handleClose}
          setStatus={setStatus}
          setUser={setUser}
        />
        <CommentModal
          open={openCommentModal}
          handleClose={handleCommentClose}
        />
        {status ? (
          <SnackBarMessage
            key={generatekey()}
            open={status.open}
            severity={status.severity}
            message={status.msg}
          />
        ) : null}
      </QueryClientProvider>
    </GlobalContext.Provider>
  );
};

export default Layout;

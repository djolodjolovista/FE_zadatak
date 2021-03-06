import React, { useState, useRef } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import "./NewCompanyScreen.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {client} from "../features/webApi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewCompanyScreen = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const textInput = useRef(null);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const token = user.tokenId;
  const request = client(token);

  const handleClose = () => {
    setOpen(false);
  };

  const addCompanie = async () => {
    if (name !== "") {
      try {
        await request.post("companies", { companyName: `${name}` });
      } catch (error) {
        alert("Error: ", error);
        setAlert(false);
      }
      setAlert(true);
      textInput.current.value = "";
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="newproject_container">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"WARNING !!!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please enter the company name field !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Typography sx={{ ml: 3 }} variant="h5">
          NEW COMPANY
        </Typography>
        <TextField
          sx={{ mt: 2 }}
          inputRef={textInput}
          id="outlined-basic"
          label="Company name"
          variant="outlined"
          onChange={(e) => {
            setName(e.target.value);
            setAlert(false);
          }}
        />
        {alert ? (
          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <Alert sx={{ ml: 4, mt: 2 }} severity="success">
              Success!
            </Alert>
            <Button
              sx={{ mt: 2, width: "70%", ml: "25%" }}
              variant="contained"
              onClick={() => {
                navigate("/companies");
              }}
            >
              Go back
            </Button>
          </Box>
        ) : (
          <Button
            sx={{ mt: 2, width: "50%", ml: "25%" }}
            variant="contained"
            onClick={addCompanie}
          >
            Save
          </Button>
        )}
      </Box>
    </div>
  );
};

export default NewCompanyScreen;

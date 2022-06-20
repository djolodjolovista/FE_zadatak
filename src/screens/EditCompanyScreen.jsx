import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {client} from "../features/webApi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const EditCompanyScreen = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState({});
  const [alert, setAlert] = useState(false);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const textInput = useRef(null);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const token = user.tokenId;
  const request = client(token);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    let data = {};
    await request
      .get(`companies/${companyId}`)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {
        alert("Error: ", err);
      });

    setCompany(data);
    setName(data.companyName);
    textInput.current.value = data.companyName;
  };
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const updateCompany = async () => {
    if (name !== "") {
      try {
        await request.put(`companies/${companyId}`, {
          companyName: `${name}`,
        });
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

  useEffect(() => {
    fetchData();
    
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card variant="outlined" sx={{ width: "50%", mt: 2, border: 2 }}>
          <React.Fragment>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Company name:
              </Typography>
              <Typography variant="h5" component="div">
                {bull}
                {company.companyName}
              </Typography>
              <Typography>Company Id: {company.companyId}</Typography>
            </CardContent>
            <CardActions></CardActions>
          </React.Fragment>
        </Card>
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
          <Typography sx={{ ml: 6 }} variant="h5">
            EDIT NAME
          </Typography>
          <TextField
            sx={{ mt: 2 }}
            inputRef={textInput}
            id="outlined-basic"
            
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
              setAlert(false);
            }}
          />
          {alert ? (
            <Box
              component="div"
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
              onClick={ async event => {
                updateCompany();
                await delay (200);
                fetchData();
              }}
            >
              Update
            </Button>
          )}
        </Box>
      </Grid>
    </div>
  );
};

export default EditCompanyScreen;

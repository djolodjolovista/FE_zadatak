import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import {client} from "../features/webApi"
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const DeleteScreen = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState({});
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const user = useSelector(selectUser);
  const token = user.tokenId;
  const request = client(token);
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
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const deleteCompany = async () => {
    try {
      await request.delete(`companies/${companyId}`);
    } catch (error) {
      alert("Error: ", error);
      setAlert(false);
    }
    setAlert(true);
  };

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
        <Typography variant="h4">
          Are you sure you want to delete this company?
        </Typography>
        {alert ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Alert sx={{ mt: 2 }} severity="success">
              Success!
            </Alert>
            <Button
              sx={{ mt: 2, width: "10%" }}
              variant="contained"
              onClick={() => {
                navigate("/companies");
              }}
            >
              Go back
            </Button>
          </Grid>
        ) : (
          <div>
            <Button
              sx={{ mt: 2, width: "10%" }}
              variant="contained"
              onClick={deleteCompany}
            >
              Yes
            </Button>
            <Button
              sx={{ ml: 2, mt: 2, width: "10%" }}
              variant="contained"
              onClick={() => {
                navigate("/companies");
              }}
            >
              No
            </Button>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default DeleteScreen;
